import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';

const RecipeItem: React.FC<{text: string, image: string}> = (props) => {
  return (
    <li>
      <Card class='recipeCard'>
        <h4>{props.text}</h4>
        <img src={props.image} />
      </Card>
    </li>
  );
}
export default RecipeItem;
