import './App.css'
import {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPagePopup from './components/LandingPage/LandingPagePopup'
import IngredientsContainer from './components/IngredientList/IngredientsContainer';
import Recipes from  './components/Recipes/Recipes';
import FoodprintContextProvider from './store/ingredient-context';

/*
*React Router V6 has changed a few things about how the routing works.
*Route is a self closing tag that takes in components as elements with a top level element required. Paths are exact by default.
*Perhaps we can create separate home & welcome routes that change whether or not the LandingPagePopup displays by default on startup.
*/

function App() {
  const [openPopup, setOpenPopup] = useState<boolean>(true);

  function handleClose () {
    setOpenPopup(!openPopup)
  }

  return (
    <FoodprintContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element = {(
          <>
            <IngredientsContainer />
            <Recipes />
            <header>It is time to scream, my dudes</header>
            {openPopup && <LandingPagePopup toggle={handleClose}/>}
          </>
          )}/>
        </Routes>
      </div>
    </FoodprintContextProvider>
  )
}

export default App
