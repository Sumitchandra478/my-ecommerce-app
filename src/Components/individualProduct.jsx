import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../FireBase Firestore/initialsetup';
import { useNavigate } from 'react-router-dom';

function IndividualProduct() {
  const navigate = useNavigate();
  // const item = useSelector(state => state.quantityArray.individualProduct);
  const item = JSON.parse(localStorage.getItem('individualItem'))
  const user = useSelector(state => state.quantityArray.userFromDispatch);
  const username = user?.username;
  const [quantityFromFirestore, setQuantityFromFirestore] = useState(0);


  useEffect(() => {
    if (!username || !item) return; // Ensure item and username are defined before making Firestore calls
    const unsubscribe = onSnapshot(doc(db, 'CartItems', username, 'items', item.name), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuantityFromFirestore(data.quantity);  // Update state with Firestore quantity
      } else {
        console.log("No such document!");
      }
    }, (error) => {
      console.error("Error fetching document:", error);
    });
  
    return () => unsubscribe();  // Clean up on component unmount
  }, [item, username]);  // Dependencies: re-run if either `item` or `username` changes
  
  
  
  

  const addRemoveButton = async (item, action) => {
    if(!user){
      alert('Login First')
      return;
    }
    const docRef=doc(db,'CartItems',username,'items',item.name)
    try{
      const snapDoc=await getDoc(docRef)
      if(snapDoc.exists()){
        const myData=snapDoc.data()
       let newQuantity=myData.quantity;
       if(action==='increase'){
        newQuantity+=1;
        await updateDoc(docRef,{quantity:newQuantity})
       }
       else if(action==='decrease'){
        newQuantity=Math.max(newQuantity-1,0)
        await updateDoc(docRef,{quantity:newQuantity})
       }
       else if(action==='addRemove'){
        if(newQuantity>0){
          newQuantity=0;
          await updateDoc(docRef,{quantity:newQuantity})

        }else{
          newQuantity+=1;
          await updateDoc(docRef,{quantity:newQuantity})
        }
       }
       //buy now
       else{
        if (newQuantity > 0) {
          await updateDoc(docRef, { quantity: newQuantity });
          navigate('/cartItems');
        } else {
          alert('add item first');
        }
        
       }
      }
      else{
        action==='decrease'?newQuantity=0:
        await setDoc(docRef,{
          title:item.name,
          quantity:1,
          description:item.description,
          image:item.image,
          price:item.price
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }
   

  return (
    <>
      <div className="containerFluid">
        <div className="row">
          <div className="col-md-10 mx-auto my-2">
            <div className="card shadow-sm p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ objectFit: 'cover', height: '150px', width: '150px' }}
                    className="rounded"
                  />
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <button
                      className="rounded-circle bg-danger text-white border-0"
                      style={{ width: '30px', height: '30px' }}
                      onClick={() => addRemoveButton(item, 'decrease')}
                    >
                      -
                    </button>
                    <span
                      className="mx-2 text-center"
                      style={{ border: '1px solid grey', width: '40px', display: 'inline-block', lineHeight: '30px', height: '30px' }}
                    >
                      {quantityFromFirestore}
                    </span>
                    <button
                      className="rounded-circle bg-success text-white border-0"
                      style={{ width: '30px', height: '30px' }}
                      onClick={() => addRemoveButton(item, 'increase')}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text text-success fw-semibold">₹{item.price}</p>
                    <p className="card-text">{item.description}</p>

                    <button
                      className={quantityFromFirestore > 0 ? 'btn btn-danger p-1' : 'btn btn-primary p-1'}
                      onClick={() => addRemoveButton(item, 'addRemove')}
                    >
                      {quantityFromFirestore > 0 ? 'Remove from Cart' : 'Add To Cart'}
                    </button> &nbsp;

                    <button
                      className="btn btn-warning p-1"
                      onClick={() => addRemoveButton(item, 'buyNow')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualProduct;
