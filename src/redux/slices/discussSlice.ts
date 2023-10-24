import getAllDiscussionService from "@/app/dashboard/services/getAllDiscussionService";
import getDiscussionById from "@/app/discussion/services/getDiscussionById";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type DiscussTypeRedux = {
  docId: string;
  user_uid: string;
  email: string;
  username: string;
  user_image: string;
  title: string;
  hashtag: Array<string>;
  image: string;
  created_at: string;
}

export interface DiscussType {
  discussionList: Array<DiscussTypeRedux>;
  discussionDetail: DiscussTypeRedux | null;
  loading: boolean;
}

const initialState: DiscussType = {
  discussionList: [],
  discussionDetail: null,
  loading: false,
}

export const fetchDiscussionsThunk = createAsyncThunk('discussions/fetchDiscussions', async () => {
  const result = await getAllDiscussionService();
  return result;
});

export const fetchDiscussionByIdThunk = createAsyncThunk('discussions/fetchDiscussionById', async (id: string) => {
  const result = await getDiscussionById(id);
  return result;
});

export const discussSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscussionsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDiscussionsThunk.fulfilled, (state, action) => {
      state.discussionList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDiscussionsThunk.rejected, (state) => {
      state.loading = false;
    });
    
    builder.addCase(fetchDiscussionByIdThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDiscussionByIdThunk.fulfilled, (state, action) => {
      state.discussionDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDiscussionByIdThunk.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
} = discussSlice.actions;

export default discussSlice.reducer;
