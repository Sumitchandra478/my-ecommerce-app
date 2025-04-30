import { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { getDoc, doc } from 'firebase/firestore';

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Shopbycategory from './Components/shopbycategory'
import FeaturedProducts from './Components/featuredProducts'
import TicketBook from './Components/ticketBook'
import Fashion from './ItemsByCategory/Fashion'
import Sports from './ItemsByCategory/Sports'
import Decoration from './ItemsByCategory/Decoration'
import Electronics from './ItemsByCategory/Electronics'
import ItemsInCart from './Components/cartItems'
import Login from './Components/login'
import { useDispatch,useSelector } from 'react-redux'
import { currentUser } from './ItemSlice/ItemsSlice'
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from './FireBase Firestore/initialsetup'; // Ensure this path is correct
import ItemsYouMayLike from './Components/itemsyoumaylike'
import IndividualProduct from './Components/individualProduct'
import Footer from './Components/footer'


function App() {
  const dispatch=useDispatch()

//  useEffect(()=>{
//   if(!username){
//     return;
//   }
//   const unsubscribe=onSnapshot(collection(db,'CartItems',username,'items'),(snapShot)=>{
//     const cartItems=snapShot.docs.map((doc)=>{
//       return{
//         id:doc.id,
//         ...doc.data()
//       }
//     });setItemsFromFireStore(cartItems)
    
//   });return ()=>unsubscribe()
//  },[username])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile from Firestore
        const docSnap = await getDoc(doc(db, 'userProfiles', user.uid));
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Dispatch currentUser action with both uid and username
          dispatch(currentUser({ uid: user.uid, username: userData.username }));
        } else {
          dispatch(currentUser(null)); // User data doesn't exist in Firestore
        }
      } else {
        dispatch(currentUser(null)); // No user is signed in
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  

  // ... your routes or components


  const router=createBrowserRouter([
    {path:'/',element:(
      <>
          <Navbar  />
          <Shopbycategory />
          <FeaturedProducts />
          <TicketBook />
          <ItemsYouMayLike/>
          <Footer/>
         
      </>
    )},
    {path:'fashionItems',element:<Fashion/>},
    {path:'sportsItems',element:<Sports/>},
    {path:'decorItems',element:<Decoration/>},
    {path:'electronicsItems',element:<Electronics/>},
    {path:'cartItems',element:<ItemsInCart/>},
    {path:'login',element:<Login/>},
    {path:'itemDetails',element:<IndividualProduct/>}
    
    ])
  


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App