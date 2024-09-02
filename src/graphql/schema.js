import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Recipe {
        id: ID!
        title: String!
        description: String!
        ingredients: [String!]!
        instructions: String!
    }
    type Query {
        recipes: [Recipe!]!
        recipe(id: ID!): Recipe!
    }

    type Mutation {
        addRecipe(
            title: String!
            description: String!
            ingredients: [String!]!
            instructions: String!
        ): Recipe!
    }
    type Subscription {
        recipeAdded: Recipe!
    }
`;


export default typeDefs;