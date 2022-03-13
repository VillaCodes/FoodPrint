import "./Recipes.css"

const RecipeItem: React.FC<{text: string}> = (props) => {
  return (
    <ul>
      {props.text}
    </ul>
  );
}
export default RecipeItem;
