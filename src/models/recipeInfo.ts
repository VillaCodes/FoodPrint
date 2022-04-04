interface ExtendedIngredients {
  id: number;
  image: string;
  name: string;
  amount: number;
  unit: string;
}

interface RecipeInfo {
    vegetarian: boolean;
    vegan: boolean;
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    instructions: string;
    extendedIngredients: ExtendedIngredients[];
    summary: string;
}

export default RecipeInfo