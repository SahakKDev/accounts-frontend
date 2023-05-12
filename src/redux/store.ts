import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./modules/accounts";

const store = configureStore({
  reducer: combineReducers({
    accounts: accountReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
