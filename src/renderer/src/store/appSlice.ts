import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type AppStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AppState {
  error?: string;
  message: string;
  status: AppStatus;
}

const initialState: AppState = {
  message: '你好，世界！啦啦啦',
  status: 'idle',
};

export const fetchGreeting = createAsyncThunk('app/fetchGreeting', async () => {
  const { data } = await axios.get<{ title: string }>(
    'https://jsonplaceholder.typicode.com/todos/1',
  );
  return data.title;
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setMessage } = appSlice.actions;
export default appSlice.reducer;
