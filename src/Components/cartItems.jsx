import React, { useEffect, useState } from 'react'
import {doc, onSnapshot, collection,deleteDoc,getDoc,updateDoc } from 'firebase/firestore'
import { db } from '../FireBase Firestore/initialsetup'
import styles from '../styles/cartItems.module.css'
import { useSelector } from 'react-redux'
function ItemsInCart() {
  const user =useSelector(state=>state.quantityArray.userFromDispatch)
  const username=user?.username
  console.log(username)
  const [itemsInCart, setItemsInCart] = useState([])
 let [totalPrice,setTotalPrice]=useState(0)
 let [totalQuantity,setTotalQuantity]=useState(0)
 
 //get total Price and total quantity
 useEffect(()=>{
  if (!username) return;

  if(itemsInCart.length>0){
    let total=itemsInCart.reduce((acc,item)=>acc+(item.price*item.quantity),0)
    let quantity=itemsInCart.reduce((acc,item)=>acc+item.quantity,0)
    setTotalPrice(total)
    setTotalQuantity(quantity)
  }
  
 },[itemsInCart])

 //get items from firestore

  useEffect(() => {
   if (!username) return;

    const unsubscribe = onSnapshot(
      collection(db, 'CartItems', username, 'items'),
      (snapshot) => {
        const myCartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setItemsInCart(myCartItems)
      }
    )
    return () => unsubscribe()
  }, [username])

  const addRemoveButton = async (item,action) => {
    let docRef=doc(db,'CartItems',username,'items',item.id)
    let itemfromfirestore=await getDoc(docRef)
   
      let data=itemfromfirestore.data()
      let newQuantity=data.quantity
      if(action==='increase'){
        newQuantity+=1;
        await updateDoc(docRef,{quantity:newQuantity})
      }
      else if(action==='decrease'){
          if(newQuantity===1){
            await deleteDoc(docRef)
          }else{
            newQuantity-=1
            await updateDoc(docRef,{quantity:newQuantity})
          }
      }
      else{
        await deleteDoc(docRef)
      }
  
    
  }

  return (
    <div className="container py-4">
    
      <div  className="row my-3 ">
      <h3 className="text-center bg-dark text-white py-2 rounded">🛒 Items in Your Cart</h3>
        <div className='col-md-7'>
        {itemsInCart.length>0?itemsInCart.map((item) => (
          item.quantity?(
        
        <div key={item.id} className="col-md-12 my-2">
          <div className="card shadow-sm p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-3 text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ objectFit: 'cover', height: '150px', width: '150px' }}
                  className="rounded"
                />
                <div className="mt-2 d-flex justify-content-center align-items-center">
                  <button
                    className="rounded-circle bg-danger text-white border-0"
                    style={{ width: '30px', height: '30px' }}
                    onClick={()=>addRemoveButton(item,'decrease')}
                  >
                    -
                  </button>
                  <span
                    className="mx-2 text-center"
                    style={{ border: '1px solid grey', width: '40px', display: 'inline-block', lineHeight: '30px', height: '30px',  }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    className="rounded-circle bg-success text-white border-0"
                    style={{ width: '30px', height: '30px' }}
                    onClick={()=>addRemoveButton(item,'increase')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text text-success fw-semibold">₹{item.price.toFixed(2)}</p>
                  <p className="card-text text-muted">{item.description}</p>
                  <button className="btn btn-secondary p-1"
                   onClick={()=>addRemoveButton(item,'remove')}
                  >Remove Item</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          ):null
     
      
    ))   :'Your Cart Is Empty'}
    
      </div>
    
    {itemsInCart.length &&  <div className='col-md-4 mt-2'>
      <div className={`row card ${styles.card2}`}>
          <div className='card-header text-center fw-bold col-md-12 bg-warning'>
              Price Details
          </div>

          <div className='col-md-12 card-body'>
            <div className='row'>
            <div className='col-md-6'>
                          <h6 className='card-text'>Price:</h6>
                          <h6 className="card-text">Total Items:</h6>
                          <h6 className="card-text">Discount:</h6>
                          <h5 className='card-text'>Total Price:</h5>
                  </div>
                      
                  <div className='col-md-6'>
                           <h6 className='card-text'>₹{totalPrice.toFixed(2)}</h6>
                           <h6 className='card-text'>{totalQuantity}</h6>
                           <h6 className='card-text'>10%</h6>
                            <h5 className='card-text'>₹{(totalPrice-totalPrice*0.1).toFixed(2)}</h5>
                  </div>
            </div>
           
            </div>

            <div className="card-footer col-md-12 p-0">
                      <button className={styles.cdn_btn}>Place Order</button>
            </div>
          
        </div>
      </div>}

     
      
      </div>
    </div>
  )
}

export default ItemsInCart


