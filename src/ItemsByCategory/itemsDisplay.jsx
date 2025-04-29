import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { updateQuantity } from '../ItemSlice/ItemsSlice';
import { db } from "../FireBase Firestore/initialsetup";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot,collection } from "firebase/firestore";
import '../styles/items.css';
import { NavLink } from 'react-router-dom';

function ItemsDisplay({ items, message }) {
  // const dispatch = useDispatch();
  // const count = useSelector(state => state.quantityArray.itemQuantityArray);
  const user = useSelector(state => state.quantityArray.userFromDispatch);
  const username=user?.username
  const [total, setTotal] =useState(Array(items.length).fill(0));
  console.log(username)
  const cartTotal = total.reduce((curr, acc) => curr + acc, 0);

  // Sync Firestore with local state
  useEffect(() => {
    if (!username) return; // 🛡️ Avoid running Firestore logic if userId is not ready

    const unsubscribe = onSnapshot(collection(db, 'CartItems', username, 'items'), (snapShot) => {
      // every time firestore changes, this runs again 🔥
      const newTotal = [...total]
      snapShot.forEach((doc) => {
        let data = doc.data();
        const index = items.findIndex((item) => item.name === data.title);
        if (index !== -1) {
          newTotal[index] = data.quantity;
        }
      });
      setTotal(newTotal); // Update state with Firestore data
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [username, items]);  //why username and not user because in app.jsx,onauthstatechanged,we are dispatching username and not user

  // Handle cart actions (add, remove, update quantity)
  const addRemoveButton = async (item, action, i) => {
    if (!username) {
      alert('Login First');
      return;
    }

    let newQuantity = 1;  // Default to 1 if adding a new item
    const docRef = doc(db, 'CartItems', username, 'items', item.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentData = docSnap.data();
      newQuantity = currentData.quantity;

      if (action === 'increase') {
        newQuantity += 1;
        await updateDoc(docRef, { quantity: newQuantity });
      } else if (action === 'decrease' && newQuantity > 0) {
        if (newQuantity === 1) {
          await deleteDoc(docRef); // Remove item if quantity is 1
          newQuantity = 0;
        } else {
          newQuantity -= 1;
          await updateDoc(docRef, { quantity: newQuantity });
        }
      } else if (action === 'RemovedItems') {
        await deleteDoc(docRef); // Remove item from cart
        newQuantity = 0;
      }
    } else {
      if (action === 'decrease') {
        newQuantity = 0;  // Don't decrease if item doesn't exist
      } else {
        await setDoc(docRef, {
          title: item.name,
          image: item.image,
          description: item.description,
          quantity: 1,
          price: item.price
        });
      }
    }

    // Dispatch Redux action to update cart quantity
    // dispatch(updateQuantity({ i, quantity: newQuantity }));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row cartLogoContainer">
          <h3 className="text-center bg-info text-dark py-2 rounded"> {message} </h3>
          <NavLink to="/cartItems">
            <div className="cartWrapper">
              <img
                className="cartIcon"
                src="https://cdn1.iconfinder.com/data/icons/material-core/20/shopping-cart-1024.png"
                alt="Cart"
              />
              <span className="cartTotal">{cartTotal}</span>
            </div>
          </NavLink>
        </div>

        <hr />
        <div className="row px-3">
          {items.map((item, i) => (
            <div key={i} className="col-lg-3 mb-3">
              <div className="card h-100 text-center">
                <img
                  src={item.image}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain", padding: "4px" }}
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-success fw-bold">₹{item.price.toFixed(2)}</p>
                  <p className="card-text text-muted">{item.description}</p>
                </div>
                <div className="card-footer text-center">
                  <button
                    onClick={() => addRemoveButton(item, 'decrease', i)}
                    className="rounded fw-bold px-2 text-white bg-danger border-0"
                  >
                    -
                  </button>
                  <span className="fw-bold px-1">{total[i]}</span>
                  <button
                    onClick={() => addRemoveButton(item, 'increase', i)}
                    className="rounded fw-bold px-2 border-0 bg-success text-white"
                  >
                    +
                  </button>
                  <br />
                  <button
                    className="mt-2 px-2 rounded border-1"
                    onClick={() =>
                      total[i] > 0
                        ? addRemoveButton(item, 'RemovedItems', i)
                        : addRemoveButton(item, 'increase', i)
                    }
                  >
                    {total[i] > 0 ? 'Remove From Cart' : 'Add To Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsDisplay;
