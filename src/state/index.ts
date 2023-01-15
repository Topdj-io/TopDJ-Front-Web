import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './userInfo'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    userInfo: userInfoReducer,
  },
})
