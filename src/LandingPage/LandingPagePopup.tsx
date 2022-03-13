import React, {useState} from "react";
import "./Popup.css"

const LandingPagePopup: React.FC<{toggle: () => void}> = ({toggle}) => {
const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(["eggs", "butter", "milk"]);
const [totalIngredients, setTotalIngredients] = useState<string[]>([]);

function clickHandler (ingredient: string) {
    if (!totalIngredients.includes(ingredient)) {
    setTotalIngredients([...totalIngredients, ingredient]);
    }

    setSuggestedIngredients([...suggestedIngredients])
}

const suggestedIngredientTags = suggestedIngredients.map((ingredient) => (
    <button className="ingredient-button button-hover" onClick={() => clickHandler(ingredient)}>{ingredient}</button>
));

console.log(totalIngredients);

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
