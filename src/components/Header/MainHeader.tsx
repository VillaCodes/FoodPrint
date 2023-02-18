import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainHeader.css';
import HeaderButton from './HeaderButton';
import { FoodprintContext } from '../../store/foodprint-context';

const MainHeader = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { isLoggedIn, onLogout } = foodprintCtx.login;
  const { setFavorites } = foodprintCtx.favorites;
  const nav = useNavigate();


  const loggingOut = () => {
    setFavorites([]);
    onLogout();
    nav('/');
  };

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
        <span>
          <span className='float' style={{marginRight: "1rem"}}>
            <Link className='link' to='/Pantry' >
              <HeaderButton >Pantry</HeaderButton>
            </Link>
          </span>
          <span className='float'>
            <HeaderButton onClick={loggingOut}>Logout</HeaderButton>
          </span>
        </span>
      )}

    </header>
  );
};

export default MainHeader;
