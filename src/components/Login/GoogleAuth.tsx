import React, { useState, useContext, useRef } from 'react';
import GoogleLogin from 'react-google-login';
import { FoodprintContext } from '../../store/foodprint-context';
import { useScript } from '../../utils/hooks/useScript';
import jwt_decode from 'jwt-decode';
import { GoogleUser } from '../../models/googleUser';
import { useNavigate } from 'react-router-dom';
import { fetchFormat } from '../../utils/main';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const googleButtonRef = useRef(null);
  const [user, setUser] = useState<User | null>(null);
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login;
  const nav = useNavigate();

  const onGoogleSignin = async (appUser: any) => {
    const userCred = appUser.credential;
    const payload: GoogleUser = jwt_decode(userCred);
    payload._id = payload.sub;

    const data = {
      'googleUser': payload,
    };

    const result = await fetchFormat('http://localhost:4000/Login', 'POST', data);

    const json = await result.json();
    onLogin(true);
    setUser(json.enrolled);
    nav('/');
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: onGoogleSignin,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: 'large',
      theme: 'outline',
    });
  });


  return (
    <div>
      {!user && <div ref={googleButtonRef}></div>}

      {user && (
        <>
          <img src={user.avatar} className='rounded-full' />

          <h1 className='text-xl font-semibold text-center my-5'>
            {user.name}
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
