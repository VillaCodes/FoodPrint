import "./Recipes.css"
import Card from '../UI/Card';

const RecipeItem: React.FC<{text: string}> = (props) => {
  return (
    <li>
      <Card class='recipeCard'>
        {props.text}
      </Card>
    </li>
  );
}
export default RecipeItem;
