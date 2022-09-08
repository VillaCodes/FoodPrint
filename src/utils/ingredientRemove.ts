import fetchFormat from './fetchFormat';

const ingredientRemove = async (data: {id: string, ingredient: {id: string, text: string}}) => {
  const result = await fetchFormat('http://localhost:4000/removeIngredient', 'DELETE', data);

  return await result.json();
}

export default ingredientRemove;
