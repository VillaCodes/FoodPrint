import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './MainHeader.css';
import HeaderButton from './HeaderButton';
import { FoodprintContext } from '../../store/foodprint-context';

const MainHeader = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { isLoggedIn, onLogout } = foodprintCtx.login;
  const { setItems } = foodprintCtx.ingredients
  let nav = useNavigate();

  const loggingOut = () => {
    setItems([])
    onLogout();
    nav('/');
  }

  return (
    <header className='main-header'>

      <Link className='link' to='/'>
        <h1>FoodPrint</h1>
      </Link>

      {!isLoggedIn && (
        <Link className='link' to='/Login'>
          <HeaderButton>Login</HeaderButton>
        </Link>
      )}

      {isLoggedIn && (
        <div>
          <div className='float'>
            <Link className='link' to='/Pantry'>
              <HeaderButton>Pantry</HeaderButton>
            </Link>
          </div>
          <div className='float'>
            <HeaderButton onClick={loggingOut}>Logout</HeaderButton>
          </div>
        </div>
      )}

    </header>
  )
}

export default MainHeader;
