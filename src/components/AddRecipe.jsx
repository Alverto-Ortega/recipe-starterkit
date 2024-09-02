import React from "react";
import { useMutation, gql } from "@apollo/client";
import styles from "./AddRecipe.module.css";

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String!, $description: String!, $ingredients: [String!]!, $instructions: String!) {
        addRecipe(title: $title, description: $description, ingredients: $ingredients, instructions: $instructions) {
            id
            title
            description
            ingredients
            instructions
        }
    }
        `;

const AddRecipe = () => {
    const [addRecipe] = useMutation(ADD_RECIPE);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addRecipe({
            variables: {
                title: event.target.title.value,
                description: event.target.description.value,
                ingredients: event.target.ingredients.value.split(","),
                instructions: event.target.instructions.value
            },
        });
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");
    };
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [ingredients, setIngredients] = React.useState("");
    const [instructions, setInstructions] = React.useState("");
    return (
        <form className={styles.form} onSubmit={handleSubmit}>            
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="ingredients">Ingredients (comma separated)</label>
                <input
                type="text"
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="instructions">Instructions</label>
                <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                />
            </div>
            <button type="submit" className={styles.submitButton}>Add Recipe</button>
        </form>
    );
};

export default AddRecipe;