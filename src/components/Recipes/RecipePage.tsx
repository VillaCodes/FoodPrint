import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./RecipePage.css"
import { readRecipe } from "../../utils/SpoonacularRequests"
import RecipeInfo from "../../models/recipeInfo";

const RecipePage: React.FC = () => {
    const {recipeID} = useParams();
    const [recipeData, setRecipeData] = useState<RecipeInfo | null>(null);

    useEffect(() => {
        if (recipeID) {
        readRecipe(recipeID).then((response) => setRecipeData(response))
        }
    }, [recipeID]);

    
    if (recipeData) {
    return (
        <main>
            <figure>
        <img src={recipeData.image} alt={recipeData.title}/>
            </figure>
        <h1>{recipeData.title}</h1>
        <p>{recipeData.instructions}</p>
        </main>
    )
    } else {
        return (
            <h1>Retrieving Data</h1>
        )
    }
};

export default RecipePage;