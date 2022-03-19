export const onCallHandler = (response: [{'title': string, 'id': number, 'image': string}], addRecipe: (title:string, id:number, image:string) => void, limit: number) => {

  for(let i = 0; i < limit; i++) {
    const { title, id, image } = response[i]
    addRecipe(title, id, image)
  }
};
