import React, { useState, useContext } from 'react';
import { FoodprintContext } from '../../store/foodprint-context';
import './Popup.css';

const LandingPagePopup: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(['eggs', 'butter', 'milk']);
  const { addIngredient, items } = useContext(FoodprintContext).ingredients;

  function clickHandler(ingredient: string) {
    if (!items.map(e => e.text).includes(ingredient)) addIngredient(ingredient);

    setSuggestedIngredients(suggestedIngredients);
  }

const suggestedIngredientTags = suggestedIngredients.map((ingredient) => {
    const selectedClass = items.map(e => e.text).includes(ingredient) && "pop-up-item-selected"
    return (
     <button
        key={suggestedIngredients.indexOf(ingredient)}
        className={`orange-font pop-up-item ${selectedClass}`}
        onClick={() => clickHandler(ingredient)}
    >
        {ingredient}
     </button>
    )
});
    
;

return (
    <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={toggle}>x</span>
            <h2 className="purple-font">Welcome to FoodPrint!</h2>
            <p className="purple-font">Start building your recipe's blueprint with some common ingredients below:</p>
            {suggestedIngredientTags}
        </div>
    </div>
  );
};

export default LandingPagePopup;
