import './App.css'

import Recipes from  './components/Recipes';
import IngredientContextProvider from './store/ingredient-context';

function App() {

  return (
    <IngredientContextProvider>
      <div className="App">
        <Recipes />
        <header className="App-header">
        </header>
      </div>
    </IngredientContextProvider>
  )
}

export default App
