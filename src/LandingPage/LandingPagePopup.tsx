import React, {useState, useContext} from "react";
import { IngredientContext } from "../store/ingredient-context";
import "./Popup.css"

const LandingPagePopup: React.FC<{toggle: () => void}> = ({toggle}) => {
const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(["eggs", "butter", "milk"]);
const { addIngredient, items } = useContext(IngredientContext)

function clickHandler (ingredient: string) {
    if (!items.map(e => e.text).includes(ingredient)) addIngredient(ingredient);
    

    setSuggestedIngredients(suggestedIngredients)
}

const suggestedIngredientTags = suggestedIngredients.map((ingredient) => (
    <button className="ingredient-button" onClick={() => clickHandler(ingredient)}>{ingredient}</button>
));

return (
    <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={toggle}>x</span>
            <h2>Welcome to FoodPrint!</h2>
            <p>Start building your recipe's blueprint with some common ingredients below:</p>
            {suggestedIngredientTags}
        </div>
    </div>
)

}

export default LandingPagePopup
