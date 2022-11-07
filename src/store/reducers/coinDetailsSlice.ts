import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CoinsService from "../../services/coins-service";
import { ICoinsDetails } from "../../services/types";

export interface ICoinDetailsStoreData {
  hasCachedCoinsDetails: boolean;
  coinDetails: ICoinsDetails;
  loading: boolean;
}

const initialState: ICoinDetailsStoreData = {
  hasCachedCoinsDetails: false,
  coinDetails: {} as ICoinsDetails,
  loading: false,
};

/**
 * getCoinDetails.
 * To get the coin details
 */
export const getCoinDetails = createAsyncThunk(
  "coin/getCoinDetails",
  async (id: string) => {
    const response = await CoinsService.instance.getCoinsById(id);
    return response;
  }
);

const coinDetailsSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * when the state is pending
       */
      .addCase(getCoinDetails.pending, (state) => {
        state.loading = true;
      })
      /**
       * when the state is fulfilled
       */
      .addCase(getCoinDetails.fulfilled, (state, { payload }) => {
        state.coinDetails = payload;
        state.loading = false;
        state.hasCachedCoinsDetails = true;
      })
      /**
       * when the state is rejected
       */
      .addCase(getCoinDetails.rejected, (state) => {
        state.loading = false;
        state.hasCachedCoinsDetails = false;
      });
  },
});

export default coinDetailsSlice.reducer;
