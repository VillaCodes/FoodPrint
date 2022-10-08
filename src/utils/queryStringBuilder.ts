const ingredientSearch = (ingredients: any) => {
  let searchString = '';
  for (let i = 0; i < ingredients.length; i++) {
    if (i !== ingredients.length - 1) {
      searchString += (ingredients[i].text +  ',+' );
    } else {
      searchString += ingredients[i].text;
      break;
    }
  }
  return searchString;
};

export default ingredientSearch;
