import { useQuery,useSubscription, gql } from "@apollo/client";

//Define the GraphQl queries and subscriptions
const GET_RECIPES = gql`
    query GetRecipes{
        recipes {
            id
            title
            description
            ingredients
            instructions
        }
    }
`;
const RECIPE_ADDED = gql`
    subscription OnRecipeAdded {
        recipeAdded {
            id
            title
            description
            ingredients
            instructions
        }
    }
`;
const RecipeList = () => {
    //Fetch the list of recipes
    const { loading, error, data } = useQuery(GET_RECIPES);
    //Handle recipes added to the list of recipes via subscription for real-time live updates
    useSubscription(RECIPE_ADDED, {
        onData: ({ client, data }) => {
            const newRecipe = data.data.recipeAdded;
            //update cache with new recipe
            client.cache.modify({
                fields: {
                    recipes(existingRecipes = []) {
                        //Add the new recipe to the existing list of recipes
                        const newRecipeRef = client.cache.writeFragment({
                            data: newRecipe,
                            fragment: gql`
                                fragment NewRecipe on Recipe {
                                    id
                                    title
                                    description
                                    ingredients
                                    instructions
                                }
                            `,
                        });
                        return [...existingRecipes, newRecipeRef];
                    },
                }
                        })
                    }
            });
            //Handle loading state
            if (loading) return <p>Loading...</p>;
            //Handle error state
            if (error) return <p>Error hmm...... {error.message}</p>;
            
    return (
        <div>
            <h1>All Recipes </h1>
            <ul>
                {data.recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p>{recipe.ingredients.join(", ")}</p>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>    
        </div>
    );
};

export default RecipeList;