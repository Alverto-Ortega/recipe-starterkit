import { PubSub } from 'graphql-subscriptions';

import { withDatabaseConnection } from '../utility/databaseUtils.js';


const pubsub = new PubSub();

const resolvers = {
    Query: {
        recipes: async (_, __, { pool }) => {
            return withDatabaseConnection(pool, async (client) => {
                const result = await client.query('SELECT * FROM recipes');
                return result.rows;
            });
        },
        recipe: async (_, { id }, { pool }) => {
            return withDatabaseConnection(pool, async (client) => {
                const result = await client.query('SELECT * FROM recipes WHERE id = $1', [id]);
                return result.rows[0];
            });
        },
        },

    Mutation: {
        addRecipe: async (_, { title, description, ingredients, instructions }, { pool }) => {
            return withDatabaseConnection(pool, async (client) => {
                const result = await client.query('INSERT INTO recipes (title, description, ingredients, instructions) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, ingredients, instructions]);
                pubsub.publish('RECIPE_ADDED', { recipeAdded: result.rows[0] });
                return result.rows[0];
            });
        },
        
    },
    Subscription: {
        recipeAdded: {
            subscribe: () => pubsub.asyncIterator(['RECIPE_ADDED']),
        },

    },
        };

export default resolvers;
