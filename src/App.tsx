import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Routes'
import FoodprintContextProvider from './store/foodprint-context';
import MainHeader from './components/Header/MainHeader';

/*
*React Router V6 has changed a few things about how the routing works.
*Route is a self closing tag that takes in components as elements with a top level element required. Paths are exact by default.
*Perhaps we can create separate home & welcome routes that change whether or not the LandingPagePopup displays by default on startup.
*/

function App() {

  return (
    <FoodprintContextProvider>
    <MainHeader />
      <div className="App">
        <Routes>
          <Route path="*" element = {<Layout />}/>
        </Routes>
      </div>
    </FoodprintContextProvider>
  )
}

export default App
