import fetchFormat from './fetchFormat';

const favoriteAdd = async (data: { id: string, recipe: { title: string, id: number, image: string } }) => {
  const result = await fetchFormat('http://localhost:4000/favoriteRemove', 'DELETE', data);

  return await result.json();
}

export default favoriteAdd;
