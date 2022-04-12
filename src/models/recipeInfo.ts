interface Units {
amount: number;
unitLong: string;
unitShort: string;
}
interface Measures {
metric: Units;
us: Units;
}

interface ExtendedIngredients {
  id: number;
  image: string;
  name: string;
  measures: Measures;
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