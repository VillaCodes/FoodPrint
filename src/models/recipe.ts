//make sure to change how id is determined.

class Recipe {
  id: string;
  text: string;

  constructor(recipeText: string) {
    this.text = recipeText;
    this.id = Math.floor((Math.random() * 10000000000) + 1).toString();
  }
}

export default Recipe;
