import axios from 'axios';
import {React, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post("/auth/register", user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    navigate("/login");
                })
            }catch(err){
                console.log(err);
            }
        }
    }

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
                    <input placeholder="Username" className="loginInput" ref={username} required />
                    <input type="email" placeholder="Email" className="loginInput" ref={email} required />
                    <input type="password" placeholder="Password" minLength="6" className="loginInput" ref={password} required />
                    <input type="password" placeholder="Password Again" minLength="6" className="loginInput" ref={passwordAgain} required />
                    <button type="submit" className='loginButton'>Sign Up</button>
                    <Link to="/login" style={{textDecoration:"none", textAlign:"center"}}>
                        <button className="loginRegisterButton">Log into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register