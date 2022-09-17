
export const onCallHandler = (response: [{'title': string, 'id': number, 'image': string}], setRecipes: (arr: any) => void) => {

  const recipes: any[] = response.reduce((a: {}[], e: any) => {
    const { title, id, image } = e;
    a.push({ title, id, image });
    return a;
  }, []);
 setRecipes(recipes)
};
