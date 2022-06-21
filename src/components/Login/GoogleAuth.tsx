import React, { useState, useContext, useRef } from "react";
import GoogleLogin from "react-google-login";
import { FoodprintContext } from '../../store/foodprint-context';
import { useScript } from "../../utils/hooks/useScript";
import jwt_decode from "jwt-decode";
import {googleUser} from "../../models/googleUser";

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
  const { onLogin } = foodprintCtx.login
  const onSuccess = async (res: any) => {
    try {

      const data = {
        "token": res?.tokenId
      }

      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      const result = await fetch('http://localhost:4000/Login', options)

      const json = await result.json();
      onLogin(json.user.email, json.user.name);
      setUser(json.user);
    } catch (error) {
      return error
    }
  };


  const onGoogleSignin = async (user: any) => {
    const userCred = user.credential;
    const payload: googleUser = jwt_decode(userCred);
    payload._id = payload.sub;

    const data = {
      "googleUser": payload
    };

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch('http://localhost:4000/Login', options);

    const json = await result.json();
    onLogin(json.enrolled.email, json.enrolled.name);
    setUser(json.enrolled);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: onGoogleSignin,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: "medium",
    });
  });


  return (
    <div>
      {!user && <div ref={googleButtonRef}></div>}

      {user && (
        <>
          <img src={user.avatar} className="rounded-full" />
          <h1 className="text-xl font-semibold text-center my-5">
            {user.name}
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
