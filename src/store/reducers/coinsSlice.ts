import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CoinsService from "../../services/coins-service";
import { ICoins } from "../../services/types";

export interface ICoinsStoreData {
  hasCachedCoins: boolean;
  coins: ICoins[];
  loading: boolean;
}

const initialState: ICoinsStoreData = {
  hasCachedCoins: false,
  coins: [],
  loading: false,
};

interface IPromise {
  currency: string;
  per_page: number;
  page: number;
}

/**
 * getCoinsData.
 * To get the coins data
 */
export const getCoinsData = createAsyncThunk(
  "coin/getCoinsData",
  async ({ currency, per_page, page }: IPromise) => {
    const response = await CoinsService.instance.getMarketCoins(
      "market_cap_desc",
      currency,
      per_page,
      page
    );
    return response;
  }
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * when the state is pending
       */
      .addCase(getCoinsData.pending, (state) => {
        state.loading = true;
      })
      /**
       * when the state is fulfilled
       */
      .addCase(getCoinsData.fulfilled, (state, { payload }) => {
        state.coins = payload;
        state.loading = false;
        state.hasCachedCoins = true;
      })
      /**
       * when the state is rejected
       */
      .addCase(getCoinsData.rejected, (state) => {
        state.loading = false;
        state.hasCachedCoins = false;
      });
  },
});

export default coinsSlice.reducer;
