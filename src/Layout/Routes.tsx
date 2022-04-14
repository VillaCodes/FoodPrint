import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import IngredientsContainer from "../components/IngredientList/IngredientsContainer"
import Recipes from "../components/Recipes/Recipes"
import LandingPagePopup from "../components/LandingPage/LandingPagePopup"
import NotFound from "./NotFound"
import Login from '../components/Login/Login';

function Layout () {

  const [openPopup, setOpenPopup] = useState<boolean>(true)

  function handleClose () {
      setOpenPopup(!openPopup)
  }

  return (
    <>
      <Routes>
          <Route path="/" element = {(
            <>
              <IngredientsContainer />
              <Recipes />
              <header>It is time to scream, my dudes</header>
              {openPopup && <LandingPagePopup toggle={handleClose}/>}
            </>
          )}/>
          <Route path='/Login' element= {<Login />}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Layout
