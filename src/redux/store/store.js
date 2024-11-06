import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import usersReducer from "../reducers/usersReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
  transforms: [
    encryptTransform({
      secretKey: "miIa-chiave34.23-0 421234&%( ",
    }),
  ],
};
const mainReducers = combineReducers({
  users: usersReducer,
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
