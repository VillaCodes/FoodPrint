//make sure to change how id is determined.

class Recipe {
  id: string;
  text: string;

  constructor(recipeText: string) {
    this.text = recipeText;
    this.id = Math.floor(Math.random()).toString();
  }
}

export default Recipe;
