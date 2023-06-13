import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import cartSlice from './cart/cartSlice';
const persistConfig = {
  key: "redux-store",
  storage: storage,
  keyPrefix: "reactjsvippro:",
}

const persistedReducer = persistReducer(persistConfig,cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: [thunk],
})

export const presist = persistStore(store);

