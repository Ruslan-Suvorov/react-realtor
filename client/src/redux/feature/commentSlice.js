import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await api.createComment(comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getComments(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReply = createAsyncThunk(
  "comment/deleteReply",
  async ({ id, commentId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteReply(id, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state, action) => {});
    builder.addCase(createComment.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = [action.payload, ...state.comments];
    });

    // ==========================================================
    builder.addCase(getComments.pending, (state, action) => {});
    builder.addCase(getComments.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    // ==========================================================
    builder.addCase(deleteComment.pending, (state, action) => {});
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { arg } = action.meta;
      if (arg) {
        state.comments = state.comments.filter(
          (comment) => comment._id !== arg.id
        );
      }
    });

    // ==========================================================
    builder.addCase(deleteReply.pending, (state, action) => {});
    builder.addCase(deleteReply.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(deleteReply.fulfilled, (state, action) => {
      state.comments = [action.payload];
    });
  },
});

export default commentSlice.reducer;
