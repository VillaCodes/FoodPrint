import fetchFormat from './fetchFormat';

const ingredientAdd = async (data: {id: string, ingredient: {id: string, text: string}}) => {
  const result = await fetchFormat('http://localhost:4000/saveIngredient', 'POST', data)

  return await result.json();
}

export default ingredientAdd;
