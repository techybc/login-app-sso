import { configureStore } from '@reduxjs/toolkit'; // Example slice
import appReducer from './slice/appSlice';
import authReducer from './slice/authSlice';


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;