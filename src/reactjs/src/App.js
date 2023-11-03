import React from 'react';
import './App.css';
import Error404 from './components/errors/Error404.component';
import Auth from './components/auth/Auth.Component';
import Home from './components/Home.Component';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

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
				<nav>
					<ul>
						<li>
							<Link to="/">Home </Link>
						</li>
						<li>
							<Link to="/auth">Auth</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/auth" element={<Auth />}/>
					<Route path="*" element={<Error404 />}/>


				</Routes>
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