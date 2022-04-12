import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";

const RecipeItem: React.FC<{recipeID: number, text: string, image: string}> = (props) => {
  const navigate = useNavigate();
  return (
    <li>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
        <button className="button" onClick={() => navigate(`/RecipePage/${props.recipeID.toString()}`)}>
          <i className="fa-fa-chevron-right"></i>Recipe
        </button>
      </Card>
    </li>
  );
}
export default RecipeItem;
