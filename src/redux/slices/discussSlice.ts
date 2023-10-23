import getAllDiscussionService from "@/app/dashboard/services/getAllDiscussionService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type DiscussTypeRedux = {
  user_uid: string;
  email: string;
  username: string;
  user_image: string;
  title: string;
  hashtag: Array<string>;
  image: string;
}

export interface DiscussType {
  discussionList: Array<DiscussTypeRedux>;
  loading: boolean;
}

const initialState: DiscussType = {
  discussionList: [],
  loading: false,
}

export const fetchDiscussionsThunk = createAsyncThunk('discussions/fetchDiscussions', async () => {
  const result = await getAllDiscussionService();
  return result;
});

export const discussSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscussionsThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDiscussionsThunk.fulfilled, (state, action) => {
      state.discussionList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDiscussionsThunk.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export const {
} = discussSlice.actions;

export default discussSlice.reducer;
