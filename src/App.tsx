import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Routes'
import FoodprintContextProvider from './store/foodprint-context';
import MainHeader from './components/Header/MainHeader';

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
