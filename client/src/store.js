import { configureStore } from '@reduxjs/toolkit'
import category from './reducers/categories'
export default configureStore({
  reducer: {
    categories: category,
    
  },
})