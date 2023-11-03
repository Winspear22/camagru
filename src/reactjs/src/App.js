import React from 'react';
import './App.css';
import Main from './components/Main.component';
import { BrowserRouter } from 'react-router-dom';


export default function App() 
{
  const login = () => {
    window.location.href = 'http://localhost:3000/auth/User42SignUp';
  };

  const loginMdp = () => {
    window.location.href = 'http://localhost:3000/auth/basicUserSignUp';
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
        <button onClick={login} className="login-btn">
          <span className='red-text'>Se connecter via 42</span>
        </button>
      </div>
      <div>
        <button onClick={loginMdp} className="login-btn">
          <span className='red-text'>Se connecter via mdp</span>
        </button>
      </div>
    </>
  );
}