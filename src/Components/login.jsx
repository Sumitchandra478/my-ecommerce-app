import React, { useState,useEffect } from 'react';
import '../styles/login.css';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../FireBase Firestore/initialsetup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, showSignIn, showSignUp } from '../ItemSlice/ItemsSlice';


function Login() {
  const [userCredentials, setUserCredentials] = useState({ userName: '', password: '', email: '' });
  const [signInDetails, setSignInDetails] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = useSelector(state => state.quantityArray.SignIn);
  const signup = useSelector(state => state.quantityArray.SignUp);
  const user=useSelector(state=>state.quantityArray.userFromDispatch)

  useEffect(()=>{
    if(user?.username){
      navigate('/')
    }
  },[user,navigate])
  // Checking user authentication status when component mounts
  //Data is passed using authStateChanged hence thought its redux,data is never loast on refresh
 //onAuthStateChanged is being used globally in app.jsx

  // Sign In (Handle Sign In)
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, signInDetails.email, signInDetails.password);
      const user = userCredential.user;

      // Retrieve username from Firestore
      const docSnap = await getDoc(doc(db, 'userProfiles', user.uid));
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userName = userData.username;  // This is the username you stored during sign-up

        // Store username in Redux
        dispatch(currentUser({ uid: user.uid, username: userName }));
        // localStorage.setItem('username',user.username)
        alert('Logged In Successfully');
        navigate('/');
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error(error.code, error.message);
      alert("Invalid credentials or user does not exist.");
    }
  };

  // Toggle between Sign In and Sign Up
  const toggleSignIn = (e) => {
    if (e.target.id === 'one') {
      dispatch(showSignIn(true));
      dispatch(showSignUp(false));
    } else {
      dispatch(showSignIn(false));
      dispatch(showSignUp(true));
    }
  };

  // Sign Up (Handle Submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
      const user = userCredential.user;

      // Save additional user data (username and email) to Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), {
        username: userCredentials.userName,  // Store username
        email: userCredentials.email,  // Store email
      });

      alert('Signed Up Successfully');
      setUserCredentials({ userName: '', password: '', email: '' });
      dispatch(showSignIn(true));
      dispatch(showSignUp(false));
    } catch (error) {
      console.error(error.code, error.message);
      alert("Sign Up Failed: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="main_block">
          <input type="radio" onChange={(e) => toggleSignIn(e)} name="commonName" className="mysignin" id="one" checked={signin} />
          <label htmlFor="one">Sign In</label> &nbsp;
          <input type="radio" name="commonName" className="mysignup" id="two" checked={signup} onChange={(e) => toggleSignIn(e)} />
          <label htmlFor="two">Sign Up</label>

          {signin && (
            <div className="main_common signIn">
              <h3>Sign In</h3>

              <div className="within_signin">
                <input
                  className="common1 user"
                  type="email"
                  required
                  placeholder="Email"
                  value={signInDetails.email}
                  onChange={(e) => setSignInDetails(prev => ({ ...prev, email: e.target.value }))} 
                />
                <input
                  className="common1 pw"
                  type="password"
                  required
                  placeholder="Password"
                  value={signInDetails.password}
                  onChange={(e) => setSignInDetails(prev => ({ ...prev, password: e.target.value }))} 
                />
                <button onClick={(e) => handleSignIn(e)} className="cdn_btn1">
                  Sign In
                </button>
              </div>

              <div className="footer">
                <span>Don't have an account?</span>
                <button className="sign_up_here mysignup" onClick={() => { dispatch(showSignIn(false)), dispatch(showSignUp(true)) }}>
                  Sign Up Here
                </button>
              </div>
            </div>
          )}

          {signup && (
            <div className="main_common signUp">
              <h3>Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="within_signup">
                  <input
                    className="common forUsername"
                    type="text"
                    required
                    placeholder="Username"
                    value={userCredentials.userName}
                    onChange={(e) => setUserCredentials(prev => ({ ...prev, userName: e.target.value }))} 
                  />
                  <input
                    className="common forPassword"
                    type="password"
                    required
                    placeholder="Password"
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials(prev => ({ ...prev, password: e.target.value }))} 
                  />
                  <input
                    className="common forEmail"
                    type="email"
                    required
                    placeholder="Email"
                    value={userCredentials.email}
                    onChange={(e) => setUserCredentials(prev => ({ ...prev, email: e.target.value }))} 
                  />
                  <button type="submit" className="cdn_btn2">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="footer">
                <span>Already have an account?</span>
                <button className="sign_in_here mysignin" onClick={() => { dispatch(showSignIn(true)), dispatch(showSignUp(false)) }}>
                  Sign In Here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
