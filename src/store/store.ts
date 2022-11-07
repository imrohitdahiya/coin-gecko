import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { ICoinDetailsStoreData } from "./reducers/coinDetailsSlice";
import { ICoinsStoreData } from "./reducers/coinsSlice";

export type RootState = {
  coin: ICoinsStoreData;
  coinDetails: ICoinDetailsStoreData;
};

const store = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export default store;
