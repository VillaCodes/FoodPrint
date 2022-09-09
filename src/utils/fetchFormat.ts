const fetchFormat = async (route: string, method: string, data: any) => {
  const result = await fetch(route, {
    method: method,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return result;
};

export default fetchFormat;
