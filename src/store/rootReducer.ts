import { combineReducers } from "@reduxjs/toolkit";
import coinDetailsSlice from "./reducers/coinDetailsSlice";
import coinsSlice from "./reducers/coinsSlice";

const rootReducer = combineReducers({
  coin: coinsSlice,
  coinDetails: coinDetailsSlice,
});

export default rootReducer;
