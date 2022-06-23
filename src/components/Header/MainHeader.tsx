import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './MainHeader.css';
import HeaderButton from './HeaderButton';
import { FoodprintContext } from '../../store/foodprint-context';

const MainHeader = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { isLoggedIn, onLogout } = foodprintCtx.login

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
        <>
          <HeaderButton>Pantry</HeaderButton>
          <HeaderButton onClick={onLogout}>Logout</HeaderButton>
        </>
      )}

    </header>
  )
}

export default MainHeader;
