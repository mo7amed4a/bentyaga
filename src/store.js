import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from "./features/auth/authSlice"
import cartReducer from "./features/cartSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth", "cart"], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(),
});

export const persistor = persistStore(store);
export { store }; // Ensure the store is exported correctly
export default store;
