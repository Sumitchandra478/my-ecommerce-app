import React, { useState, useEffect } from 'react';
import '../styles/carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, showSignIn, showSignUp } from '../ItemSlice/ItemsSlice';
import { signOut } from "firebase/auth";
import { auth } from '../FireBase Firestore/initialsetup';
import { useNavigate } from 'react-router-dom';

function Mycarousel({ onDropdownEnter, onDropdownLeave }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let myImages = [
    "https://i.imgur.com/o5DRBXj.jpeg",
    "https://i.imgur.com/fzRwCYo.jpeg",
    "https://i.postimg.cc/ry1ZxmFg/mall3.jpg"
  ];

  const popup = useSelector(state => state.quantityArray.isPopupOpen);
  const user = useSelector(state => state.quantityArray.userFromDispatch);

  // Debugging: Check if user exists and if user.username is set correctly
  // console.log("Current User from Redux:", user);
  // console.log("User username:", user ? user.username : "No username");

  // Logout handler
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(currentUser(null));  // Clear Redux state
      alert('Logged Out successfully');
    } catch (error) {
      // console.error(error.message);
      alert('Error logging out');
    }
  };

  const handleSignUp = () => {
    dispatch(showSignIn(false));
    dispatch(showSignUp(true));
    navigate('/login');
  };

  const handleSignIn = () => {
    dispatch(showSignIn(true));
    dispatch(showSignUp(false));
    navigate('/login');
  };

  // Carousel Image Auto-Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % myImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className='carouselContainer'>
      {popup && (
        <div className="dropdown"
          onMouseEnter={onDropdownEnter}
          onMouseLeave={onDropdownLeave}
        >
          <ul style={{ listStyle: 'none' }}>
            {user && user.username ? (
              <li>Current User: {user.username} &nbsp;
                <button onClick={handleLogout} style={{ all: 'unset', color: 'blue' }}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  New Customer? <button className="dropdown-btn" onClick={handleSignUp}>Sign up</button>
                </li>
                <li>
                  Already have an account? <button className="dropdown-btn" onClick={handleSignIn}>Sign In</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    

      {prevIndex!==null && (
        <img key={`prev-${prevIndex}`} src={myImages[prevIndex]} className="carouselImage slideOut"
          alt="Previous Slide" />
      )}
      <img key={`current-${currentIndex}`} src={myImages[currentIndex]} className="carouselImage slideIn"
        alt="Current Slide" />

      <div className='carouselText'>
        <h3 className='liveSale' >Chandra Store</h3>
        {/* <h3 className='liveSale'>Festival Sale Is Live!</h3> */}
        <h4 className='textDiscount'>Get 20% Off On Electronics Items Using ICICI Bank Credit Card</h4>
      </div>
    </div>
  );
}

export default Mycarousel;
