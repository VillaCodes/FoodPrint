import React, { useContext } from 'react';
import Card from '../UI/Card';
import RecipeItem from './RecipeItem';
import { FoodprintContext } from "../../store/foodprint-context";


const List = ({ items }: any) => {
  const foodprintCtx = useContext(FoodprintContext);
  const favorites = foodprintCtx.favorites.items;

  const loopCheck = (item: any) => {
    for (let i = 0; i < favorites.length; i++) {
      if (item.id === favorites[i].id) {
        return true;
      }
    }
    return false;
  }

  return (
    <Card class='card'>
      <ul>
        {items.map((item: any) => (
          <RecipeItem key={item.id} text={item.title} image={item.image} recipeID={item.id} isFavorite={loopCheck(item)} />
        ))}
      </ul>
    </Card>
  )
};

export default List;
