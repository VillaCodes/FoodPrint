const ingredientChange = async (data: {id: string, ingredient: {id: string, text: string}, action: string}) => {
  const result = await fetch('http://localhost:4000/saveIngredient', {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await result.json();
}

export default ingredientChange;
