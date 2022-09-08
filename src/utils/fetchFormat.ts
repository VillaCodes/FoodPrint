const fetchFormat = async (route: string, method: string, data: any) => {
  if (method !== 'GET') {
    const result = await fetch(route, {
      method: method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return result;
  } else {
    const result = await fetch(route, {
      method: method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });
    return result;
  }
};

export default fetchFormat;
