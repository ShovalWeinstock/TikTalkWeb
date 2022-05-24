import '../LoginAndRegister.css';
import { useState } from 'react';
import { login } from './loginValidations.js';

function Login({changeRegState, changeLoggedInUser}) {

    // typed username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // clear the error message
    const clearErrors = () => {
        document.getElementById("loginError").innerHTML = "";
    }

    // submit the form
    async function handleSubmit(e){
        clearErrors();
        e.preventDefault();
        var user = await login(username, password);
        // if the login was successful, update the loggedIn user 
        if (user != null) {
            changeLoggedInUser(user);
        }
    }

    return (
        <div className="main-block" id="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {/*input field for username*/}
                <div className="mb-3">
                    <label htmlFor="inputUsername2" className="form-label">Username</label>
                    <input type="username" className="form-control" id="inputUsername2" aria-describedby="usernameHelp"
                        value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                {/*input field for password*/}
                <div className="mb-3">
                    <label htmlFor="inputPassword2" className="form-label">Password</label>
                    <input type="password" id="inputPassword2" className="form-control" aria-describedby="passwordHelpBlock"
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {/*submit button*/}
                <button type="Login" className="btn btn-primary">Submit</button>
                {/*registeration for new users*/}
                <span id="notRegistered" className="form-text"> Not registered?</span>
                <span>
                    <a onClick={changeRegState} className="form-text"> Click here</a>
                </span>
                <span className="form-text"> to regiser</span>
                <p id="loginError" className="errorMessege"></p>
            </form>
        </div>
    );
}

export default Login;
