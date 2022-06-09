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

interface Steps {
  number: number;
  step: string;
}

interface StepObject {
  name: string;
  steps: Steps[];
}

interface RecipeInfo {
  analyzedInstructions: StepObject[];
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

const RecipeInfoDefault = {
  analyzedInstructions: [{
    name: "",
    steps: [{
      number: 0,
      step: ""
    }]
  }],
  vegetarian: false,
  vegan: false,
  id: 0,
  title: "",
  image: "",
  servings: 0,
  readyInMinutes: 0,
  instructions: "",
  summary: "",
  extendedIngredients: [{
    id: 0,
    image: "",
    name: "",
    measures: {
      metric: {
        amount: 0,
        unitLong: "",
        unitShort: ""
      },
      us: {
        amount: 0,
        unitLong: "",
        unitShort: ""
      }
    }
  }],
}

export {RecipeInfo, RecipeInfoDefault, Steps}