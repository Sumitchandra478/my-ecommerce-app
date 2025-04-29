import { createSlice } from "@reduxjs/toolkit";


const  initialState= {
  userFromDispatch: {},
  SignIn: true,
  SignUp: false,
  isPopupOpen: false,
  productSearched:[],
  // itemQuantityArray: [],
  // individualProduct: {},not required because this is stored in localStorage
}

export const itemSlice = createSlice({
  name: 'quantityArray',
 initialState,
  reducers: {
    currentUser: (state, action) => {
      state.userFromDispatch = action.payload;
    },
    showSignIn: (state, action) => {
      state.SignIn = action.payload;
    },
    showSignUp: (state, action) => {
      state.SignUp = action.payload;
    },
    togglePopup: (state,action) => {
      state.isPopupOpen = action.payload;
    },
    searchedItem:(state,action)=>{
      state.productSearched=action.payload
    }
  },
});

export const {
  currentUser,
  showSignIn,
  showSignUp,
  togglePopup,
  searchedItem,
  // updateQuantity,
  // addIndividualProducts
} = itemSlice.actions;

export default itemSlice.reducer;
