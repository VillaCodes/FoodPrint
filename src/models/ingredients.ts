//make sure to change how id is determined.

class Ingredients {
  id: string;
  text: string;

  constructor(ingredientText: string) {
    this.text = ingredientText;
    this.id = new Date().toISOString();
  }
}

export default Ingredients;
