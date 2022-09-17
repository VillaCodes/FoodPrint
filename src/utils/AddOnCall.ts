export const onCallHandler = (response: [{'title': string, 'id': number, 'image': string}], addRecipe: (title:string, id:number, image:string) => void) => {

  for(let i = 0; i < response.length; i++) {
    const { title, id, image } = response[i]
    addRecipe(title, id, image)
  }
};
