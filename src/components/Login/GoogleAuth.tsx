import React, { useState, useContext } from "react";
import GoogleLogin from "react-google-login";
import { FoodprintContext } from '../../store/foodprint-context';
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login
  const nav = useNavigate();

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
      nav('/');
    } catch (error) {
      return error
    }
  };

  return (
    <div>
      {!user && (
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          onSuccess={onSuccess}
        />
      )}

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
