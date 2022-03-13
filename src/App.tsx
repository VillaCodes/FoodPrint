import './App.css'
import React, {useState} from 'react'
import LandingPagePopup from './LandingPage/LandingPagePopup'

import Recipes from  './components/Recipes';
import IngredientContextProvider from './store/ingredient-context';

function App() {
  const [openPopup, setOpenPopup] = useState<boolean>(true);

  function handleClose () {
    setOpenPopup(!openPopup)
  }

  return (
    <IngredientContextProvider>
      <div className="App">
        <Recipes />
      <header>It is time to scream, my dudes</header>
      {openPopup && <LandingPagePopup toggle={handleClose}/>}
      </div>
    </IngredientContextProvider>
  )
}

export default App
