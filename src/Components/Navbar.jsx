import React, { useRef,useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { togglePopup,searchedItem } from '../ItemSlice/ItemsSlice';
import Mycarousel from './carousel'; 
import '../styles/navbar.css'; 
import allItems from '../JSONFILES/AllAtOnePlace.json'


function Navbar() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const hideTimerRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const product=useSelector(state=>state.quantityArray.productSearched)
  console.log('its prod', product)
  // Open Popup (Dropdown) when hovering over login or dropdown
  const handleLoginEnter = () => {
    dispatch(togglePopup(true));
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const handleLoginLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      dispatch(togglePopup(false));
    }, 300);
  };

  const handleDropdownEnter = () => {
    dispatch(togglePopup(true));
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const handleDropdownLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      dispatch(togglePopup(false));
    }, 300);
  };

  //Search function
  const searchFun = (val) => {
    setSearchText(val); // <-- update state
    const regex = val.replace(/\./g, '.*');
    const safeSearch = new RegExp(regex, 'i');
    const matchedItems = allItems.filter((item) => safeSearch.test(item.name));
    dispatch(searchedItem(matchedItems));
  };

  const redirectToIndProduct=(product)=>{
    const productData={description:product.description,image:product.img,price:product.price,name:product.name}
    localStorage.setItem('individualItem',JSON.stringify(productData))
    navigate('/itemDetails')
  }

  //show searched item

  return (
    <>
      <nav className="navbar">
        <div className="logo-section">
          <img
            className="logo"
            src="https://cdn4.iconfinder.com/data/icons/dress-up-icons/200/dressup_shop-512.png"
            alt="Shop Logo"
          />
        </div>

        <div className="search-section">
          <input type="search" onChange={(e)=>searchFun(e.target.value)} placeholder="Search for Products, Brands and More" />
        </div>

        <ul className="menu-section">
          <NavLink to="/login" className="text-decoration-none text-dark">
            <li
              className="login"
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
            >
              <img
                className="icon"
                src="https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-512.png"
                alt="Login"
              />
              <span className="fw-bold">Login</span>
              <img
                className="icon2"
                src="https://cdn2.iconfinder.com/data/icons/outline-ui-v2/24/arrowdown-128.png"
                alt="arrowdown"
              />
            </li>
          </NavLink>

          <NavLink to="/cartItems" className="text-decoration-none text-dark fw-bold">
            <li>
              <img
                className="icon"
                src="https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/shopping-cart-1024.png"
                alt="Cart"
              />
              <span>Cart</span>
            </li>
          </NavLink>
        </ul>
      </nav>

        {searchText && (
            <div className="myProduct">
              {product.length > 0 ? (
                product.map((item, i) => <li onClick={()=>redirectToIndProduct(item)} key={i}>{item.name}</li>)
              ) : (
                <p>No Items Found...</p>
              )}
            </div>
          )}

      
        <Mycarousel
          onDropdownEnter={handleDropdownEnter}
          onDropdownLeave={handleDropdownLeave}
        />
      
    </>
  );
}

export default Navbar;
