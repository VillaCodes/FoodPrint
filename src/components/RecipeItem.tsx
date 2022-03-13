

const RecipeItem: React.FC<{text: string}> = (props) => {
  return (
    <li>
      {props.text}
    </li>
  );
}
export default RecipeItem;
