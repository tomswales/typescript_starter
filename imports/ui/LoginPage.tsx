import React, {FC, useState, useEffect} from 'react';
import { Meteor } from 'meteor/meteor';

const LoginPage: FC = () => {

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect((): void=>{
  	return (): void => {
  		setUsernameInput("");
  		setPasswordInput("");
  	}
  }, []);

  return <div className="login-panel">
    <div className="logo-container">
    	<img className="logo" src="/images/meteor_logo.png"/>
    	<img className="logo" src="/images/typescript_logo.png"/>
    </div>
    <h1>Meteor + Typescript Starter</h1>
    <div>
    	<h4>Username:</h4>
    	<input className="login-input" type="text" value={usernameInput} onChange={handleUsernameChange}/>
    </div>
 	<div>
    	<h4>Password:</h4>
    	<input className="login-input" type="password" value={passwordInput} onChange={handlePasswordChange}/>
    </div>
   	<button disabled={loginButtonIsDisabled()} onClick={handleLoginClick}>Log in</button>
   	<p className="login-error">{errorMessage}</p>
  </div>

  function handleUsernameChange(e): void {
  	setErrorMessage("");
  	setUsernameInput(e.target.value);
  }

  function handlePasswordChange(e): void {
  	setErrorMessage("");
  	setPasswordInput(e.target.value);
  }

  function handleLoginClick(e): void {
  	e.preventDefault();
  	Meteor.loginWithPassword(usernameInput, passwordInput, (error)=>{
  		if(error) {
  			setUsernameInput("");
  			setPasswordInput("");
  			setErrorMessage("There was a problem with your login credentials. Please try again")
  		}
  	});
  }

  function loginButtonIsDisabled(): boolean {
  	return !(usernameInput.length > 0 && passwordInput.length > 0);
  } 
};


export default LoginPage;
