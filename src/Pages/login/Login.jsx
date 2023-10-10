import {React, useContext, useRef } from 'react';
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        // console.log(password.current.value);
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    }

    console.log(user);

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social App</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social App.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="email" placeholder="Email" className="loginInput" ref={email} required />
                    <input type="password" placeholder="Password" className="loginInput" minLength="6" ref={password} required />
                    <button className='loginButton' type='submit' disabled={isFetching}>
                        {isFetching ? <CircularProgress color="inherit" /> : "Log In" }
                    </button>
                    <span className="loginForgot">Forgot Password</span>
                    <Link to="/register" style={{textDecoration:"none", textAlign:"center"}}> 
                    <button className="loginRegisterButton" disabled={isFetching} type='submit'>
                        {isFetching ? <CircularProgress color="inherit" /> : "Create a new account" }
                    </button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login