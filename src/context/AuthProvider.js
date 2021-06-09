import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = React.createContext();

const fakeUserData = {
  id: 1,
  name: 'Jhon Doe',
  avatar:
    'http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png',
  roles: ['USER', 'ADMIN'],
};

const AuthProvider = (props) => {
  let history = useHistory();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const signIn = (params) => {
    console.log(params, 'sign in form Props');
    setUser(fakeUserData);
    setIsLoggedIn(true);
    localStorage.setItem("IsLoggedIn",IsLoggedIn);
    history.push(`/`);
  };

  const signUp = (params) => {
    console.log(params, 'sign up form Props');
    setUser(fakeUserData);
    setIsLoggedIn(true);
    localStorage.setItem("IsLoggedIn",IsLoggedIn);
    history.push(`/`);
  };

  const logOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.setItem("IsLoggedIn",IsLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        IsLoggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
