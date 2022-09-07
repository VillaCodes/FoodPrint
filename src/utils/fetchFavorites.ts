const favoriteChange = async (data: { id: string, recipe: { title: string, id: number, image: string }, action: string }) => {
  const result = await fetch('http://localhost:4000/alterFavorite', {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await result.json();
}

export default favoriteChange;
