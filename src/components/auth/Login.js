import React, { useState } from 'react';
import './Login.css';
import { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../firebase';
import db from '../../firebase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    signInWithPopup(auth, provider).catch((e) => {
      alert(e.message);
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((e) => alert(e.message));

      setEmail("");
      setPassword("");
  };

  const registerSignIn = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
        }
      })
      .catch((e) => alert(e.message));
      setEmail("");
      setPassword("");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted with ❤️ by{" "}
          </p>
          <h3>Sandip Kumar Dubey</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://i.pinimg.com/736x/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button type='submit' 
             onClick={handleSignIn}>Login</button>
            </div>
            <button onClick={registerSignIn}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2024</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
