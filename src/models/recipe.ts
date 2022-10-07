class Recipe {
  id: number;

  title: string;

  image: string;


  constructor(recipeText: string, recipeID: number, recipeImage: string) {
    this.title = recipeText;
    this.id = recipeID;
    this.image = recipeImage;
  }
}
interface MissedIngredients {
  amount: number;
  name: string;
  unit: string;
  unitLong: string;
  image: string;
  id: number;
}

interface UsedIngredients {
  amount: number;
  name: string;
  unit: string;
  unitLong: string;
  image: string;
  id: number;
}

interface IngredientSearch {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
  missedIngredients: MissedIngredients[];
  usedIngredientCount: number;
  usedIngredients: UsedIngredients[];
}

const IngredientSearchDefault: IngredientSearch = {
  id: 0,
  title: '',
  image: '',
  missedIngredientCount: 0,
  missedIngredients: [{
    amount: 0,
    name: '',
    unit: '',
    unitLong:'',
    image: '',
    id: 0,
  }],
  usedIngredientCount: 0,
  usedIngredients: [{
    amount: 0,
    name: '',
    unit: '',
    unitLong:'',
    image: '',
    id: 0,
  }],
};

export { Recipe, IngredientSearch, IngredientSearchDefault };
