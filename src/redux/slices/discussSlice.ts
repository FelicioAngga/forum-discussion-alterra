import getAllDiscussionService from "@/app/dashboard/services/getAllDiscussionService";
import getDiscussionById from "@/app/discussion/services/getDiscussionById";
import getReplyDiscussService, { ReceivedReplyDiscussType } from "@/app/discussion/services/getReplyDiscussService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type DiscussTypeRedux = {
  docId: string;
  comments_count: number;
  user_id: string;
  email: string;
  username: string;
  user_image: string;
  title: string;
  hashtag: Array<string>;
  image: string;
  likes?: Array<string>;
  created_at: string;
}

export interface DiscussType {
  discussionList: Array<DiscussTypeRedux>;
  discussionDetail: DiscussTypeRedux | null;
  replyDiscussionList: Array<ReceivedReplyDiscussType> | null;
  loading: boolean;
}

const initialState: DiscussType = {
  discussionList: [],
  discussionDetail: null,
  replyDiscussionList: null,
  loading: false,
}

export const fetchDiscussionsThunk = createAsyncThunk('discussions/fetchDiscussions', async (search: string | undefined) => {
  let result = await getAllDiscussionService();
  if (search) {
    result = result.filter(item => item.title.includes(search));
  }
  return result;
});

export const fetchDiscussionByIdThunk = createAsyncThunk('discussions/fetchDiscussionById', async (id: string) => {
  const discussionDetail = await getDiscussionById(id);
  const replyDiscussionResult = await getReplyDiscussService(id);
  return { discussionDetail, replyDiscussionResult };
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
      state.discussionDetail = action.payload.discussionDetail;
      state.replyDiscussionList = action.payload.replyDiscussionResult;
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
