import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state,action) => {
      const items = state.items;
      let isProductExists = false;
      items.map((item)=>{
        if(item._id===action.payload._id){
          item.qty+=action.payload.qty;
          isProductExists=true;
        }
        return item;
      });
      !isProductExists && items.push(...action.payload,{isCheck:false});
    },
    updateCart: (state, action) => {
      const items = state.items;
      items.map((item)=>{
        if(item._id===action.payload._id){
          item.qty=action.payload.qty;
        }
        return item;
      });
    },
    deleteCart: (state, action) => {
      state.items = state.items.filter((item)=>item._id!==action.payload)
    },
    removeCart: (state, action) => {
      state.items =[]
    },
    selectItemCart:(state,action)=>{
      state.items.map((item)=>{
        if(item._id==action.payload){
          item.isCheck=!item.isCheck;
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart,removeCart,deleteCart,selectItemCart } = cartSlice.actions

export default cartSlice.reducer