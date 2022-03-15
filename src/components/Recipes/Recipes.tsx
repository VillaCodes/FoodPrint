import RecipeItem from './RecipeItem';
import Card from '../UI/Card';
import {fetchData} from '../../utils/SpoonacularRequests';
import "./Recipes.css";

const tempRecipes = ['Lasagna', 'Bakers Bread', 'Pizza']
const Recipes: React.FC = () => {
  return (
    <>
    <Card class='card'>
      <ul>
        {tempRecipes.map((item) => (
          <RecipeItem text={item} />
        ))}
      </ul>
    </Card>
    </>
  );
};
export default Recipes;
