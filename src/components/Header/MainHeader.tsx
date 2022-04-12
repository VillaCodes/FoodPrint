import { useContext } from 'react';
import './MainHeader.css';
import HeaderButton from './HeaderButton';
import { FoodprintContext } from '../../store/ingredient-context';

const MainHeader = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { isLoggedIn, onLogout, onLogin } = foodprintCtx.login
  const loginHandler = () => {
    if (isLoggedIn) {
      return onLogout()
    } else {
      return onLogin('asd', 'asd')
    }
  }
  return (
    <header className='main-header'>
      <h1 onClick={loginHandler}>FoodPrint</h1>
      {!isLoggedIn && <HeaderButton>Login</HeaderButton>}
      {isLoggedIn && <HeaderButton>Pantry</HeaderButton>}
      {isLoggedIn && <HeaderButton>Logout</HeaderButton>}
    </header>
  )
}

export default MainHeader;
