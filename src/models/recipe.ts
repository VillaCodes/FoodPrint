//make sure to change how id is determined.

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

export default Recipe;
