import React from "react";

function Auth() {
  const login = () => {
    window.location.href = 'http://localhost:3000/auth/User42SignUp';
  };

  return (
    <>
      <div>Auth</div>
	      <form action="http://localhost:3000/auth/basicUserSignUp" method="post">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" name="username" required /><br />

          <label for="email">Adresse e-mail:</label>
          <input type="email" id="email" name="email" required /><br />

          <label for="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required /><br />

            <button type="submit">S'inscrire</button>
        </form>
        
        <button onClick={login} className="login-btn">
          <span className='red-text'>Se connecter via 42</span>
        </button>
    </>
  );
}

export default Auth;