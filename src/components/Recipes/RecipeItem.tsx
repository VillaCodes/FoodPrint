import "./Recipes.css"

const RecipeItem: React.FC<{text: string}> = (props) => {
  return (
    <li>
      {props.children}
    </li>
  );
}
export default RecipeItem;
