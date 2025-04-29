import { configureStore } from "@reduxjs/toolkit";
import itemsSliceReducers from '../ItemSlice/ItemsSlice'
const Store=configureStore({
    reducer:{
        quantityArray:itemsSliceReducers
    }
   
})

export default Store