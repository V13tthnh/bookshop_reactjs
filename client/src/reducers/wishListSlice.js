import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.value.find(item => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.value.push({ ...newItem, quantity: 1 });
        }
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addToWishList } = wishListSlice.actions

export default wishListSlice.reducer