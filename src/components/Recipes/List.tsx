import React from 'react';
import Card from '../UI/Card';
import RecipeItem from './RecipeItem';

const List = ({ items }: any) => {

  return (
    <Card class='card'>
      <ul>
        {items.map((item: any) => (
          <RecipeItem key={item.id} text={item.title} image={item.image} recipeID={item.id} />
        ))}
      </ul>
    </Card>
  )
};

export default List;
