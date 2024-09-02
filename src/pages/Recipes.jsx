import AddRecipe from "../components/AddRecipe";
import RecipeList from "../components/RecipeList";
import styles from "./Recipes.module.css";

const Recipes = () => {

    return (
        <div>
            <h1>Recipes page</h1>
            <div className={styles["recipe-list"]}>
                <RecipeList />
            </div>
            <div>
                <h2>Add a Recipe</h2>
                <AddRecipe />
            </div>
        </div>
    );
};

export default Recipes;