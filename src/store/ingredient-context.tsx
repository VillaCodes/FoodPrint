import React, { useState } from 'react';
import Ingredients from '../models/ingredients';

type IngredientsContextObj = {
  items: Ingredients[];
  addIngredient: (text: string) => void;
  removeIngredient: (id: string) => void;
}

export const IngredientContext = React.createContext<IngredientsContextObj>({
  items: [],
  addIngredient: () => {},
  removeIngredient: (id: string) => {}
});

const IngredientContextProvider: React.FC = (props) => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  const addIngredientHandler = (ingredientText: string) => {
    const newIngredient = new Ingredients(ingredientText);

    setIngredients((prevIngredients) => {
      return prevIngredients.concat(newIngredient);
    });
  };

  const removeIngredientHandler = (ingredientId: string) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.filter(ingredient => ingredient.id !== ingredientId);
    });
  };

  const contextValue: IngredientsContextObj = {
    items: ingredients,
    addIngredient: addIngredientHandler,
    removeIngredient: addIngredientHandler
  };

  return (
    <IngredientContext.Provider value={contextValue}>
      {props.children}
    </IngredientContext.Provider>
  )
}

export default IngredientContextProvider;