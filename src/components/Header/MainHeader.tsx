import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './MainHeader.css';
import HeaderButton from './HeaderButton';
import { FoodprintContext } from '../../store/foodprint-context';

const MainHeader = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { isLoggedIn, onLogout } = foodprintCtx.login
  return (
    <header className='main-header'>

      <Link className='headerLink' to='/'>
        <h1>FoodPrint</h1>
      </Link>

      {!isLoggedIn && (
        <Link className='headerLink' to='/Login'>
          <HeaderButton>Login</HeaderButton>
        </Link>
      )}

      {isLoggedIn && (
        <>
          <HeaderButton>Pantry</HeaderButton>
          <Link className='headerLink' to='/'>
            <HeaderButton onClick={onLogout}>Logout</HeaderButton>
          </Link>
        </>
      )}

    </header>
  )
}

export default MainHeader;
