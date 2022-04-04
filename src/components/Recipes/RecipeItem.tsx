import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';

const RecipeItem: React.FC<{text: string, image: string}> = (props) => {
  return (
    <li>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
        <button className="button-primary">
          <i className="fa-fa-chevron-right"></i>Recipe
        </button>
      </Card>
    </li>
  );
}
export default RecipeItem;
