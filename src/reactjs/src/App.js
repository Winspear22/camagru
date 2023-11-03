import React from 'react';
import './App.css';
import Error404 from './components/errors/Error404.component';
import Auth from './components/auth/Auth.Component';
import Home from './components/Home.Component';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Auth</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
