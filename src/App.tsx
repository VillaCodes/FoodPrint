import './App.css'
import {useState} from 'react'
import LandingPagePopup from './components/LandingPage/LandingPagePopup'

import Recipes from  './components/Recipes/Recipes';
import FoodprintContextProvider from './store/ingredient-context';

function App() {
  const [openPopup, setOpenPopup] = useState<boolean>(true);

  function handleClose () {
    setOpenPopup(!openPopup)
  }

  return (
    <FoodprintContextProvider>
      <div className="App">
        <Recipes />
        <header>It is time to scream, my dudes</header>
        {openPopup && <LandingPagePopup toggle={handleClose}/>}
      </div>
    </FoodprintContextProvider>
  )
}

export default App
