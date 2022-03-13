//make sure to change how id is determined.

class Ingredients {
  id: string;
  text: string;

  constructor(ingredientText: string) {
    this.text = ingredientText;
    this.id = Math.floor((Math.random() * 10000000000) + 1).toString();
  }
}

export default Ingredients;
