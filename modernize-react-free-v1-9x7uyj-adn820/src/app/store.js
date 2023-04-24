import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from 'src/services/userAuthApi'
import { AddApi } from 'src/services/AddApi'
import userReducer from '../features/userSlice'
import authReducer from '../features/authSlice'
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [AddApi.reducerPath]: AddApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)