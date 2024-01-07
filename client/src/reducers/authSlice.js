import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  userData: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
}

export const loginHandler = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/login`, credentials, {'Accept': 'application/json'});
    const { access_token } = response.data;
    const userDataResponse = await axios.get(`http://127.0.0.1:8000/api/me`, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json',
      }
    });
    const userData = userDataResponse.data;
    return { access_token, userData };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginHandler.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginHandler.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    })
    .addCase(loginHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred during login';
    })
  },
})

export const {setUser, setLoading, setError, logout} = authSlice.actions

export default authSlice.reducer