import React, {useEffect, useRef, useState} from 'react';
import Card from '../UI/Card';
import RecipeItem from './RecipeItem';
import { Recipe } from '../../models/recipe';

const List = ({ items }: any) => {
  const [lastElement, setLastElement] = useState<any>(null);
  const [renderingPoint, setRenderingPoint] = useState(1);
  const recipesPerPage = 10;
  const TOTAL_PAGES = Math.round(items.length/recipesPerPage);
  const renderedItems = items.slice(0, renderingPoint*recipesPerPage)

  /*
  Initializes intersection observer.
  It takes in an element to be observed and
  sets the rendering point in order to render additional items
  once the observed element is intersected.
  */
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setRenderingPoint((no) => no + 1)
        }
      }
    )
  )

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
  }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  //Last mapped element is observed to trigger more renders when encountered through scrolling
  return (
    <Card class='card'>
      <ul>
        {renderedItems.map((item: Recipe, idx: number) => (
          idx === renderedItems.length - 1 &&
          renderingPoint <= TOTAL_PAGES ? (
            <div
            key={item.id}
            ref={setLastElement}
            >
              <RecipeItem key={item.id} text={item.title} image={item.image} recipeID={item.id} />
            </div>
          ) : (
          <RecipeItem key={item.id} text={item.title} image={item.image} recipeID={item.id} />
          )
        ))}
      </ul>
    </Card>
  )
};

export default List;
