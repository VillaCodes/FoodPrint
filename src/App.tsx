import './App.css'
import { Route, Routes } from 'react-router-dom'
import GoogleAuth from './components/Login/GoogleAuth';
import Layout from './Layout/Routes'
import FoodprintContextProvider from './store/foodprint-context';
import MainHeader from './components/Header/MainHeader';


function App() {

  return (
    <FoodprintContextProvider>
    <MainHeader />
    <GoogleAuth />
      <div className="App">
        <Routes>
          <Route path="*" element = {<Layout />}/>
        </Routes>
      </div>
    </FoodprintContextProvider>
  )
}

export default App
