import { Route, Routes } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import IngredientsContainer from '../components/IngredientList/IngredientsContainer';
import Recipes from '../components/Recipes/Recipes';
import LandingPagePopup from '../components/LandingPage/LandingPagePopup';
import NotFound from './NotFound';
import RecipePage from '../components/Recipes/RecipePage';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
import Pantry from '../components/IngredientList/Pantry';
import { FoodprintContext } from '../store/foodprint-context';


function Layout() {
  const [ openPopup, setOpenPopup ] = useState<boolean>(true);
  const { isLoggedIn } = useContext(FoodprintContext).login;

  function handleClose() {
    setOpenPopup(!openPopup);
  }

  return (
    <>
      <Routes>
          <Route path='/' element = {(
            <>
              {!isLoggedIn && <IngredientsContainer />}
              <Recipes />
              {openPopup && !isLoggedIn && <LandingPagePopup toggle={handleClose}/>}
            </>
            )}/>
          <Route path='/RecipePage/:recipeID' element={<RecipePage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          {isLoggedIn && <Route path='/Pantry' element={<Pantry />}/>}
          {!isLoggedIn && <Route path='/Pantry' element={<Login />}/>}
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Layout;
