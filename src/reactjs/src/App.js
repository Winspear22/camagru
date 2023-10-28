/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from 'react';

function App() {
  const login = () => {
    window.location.href = 'http://localhost:3000/auth/User42SignUp';
  };

  return (
    <div>
      <button onClick={login} className="login-btn">
        <span>Se connecter</span>
      </button>
    </div>
  );
}

export default App;

