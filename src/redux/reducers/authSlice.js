import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../asset/client";

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.error = null;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.error = null;
    },
  },
});

export const { setUser, setData, setError, clearUser } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    dispatch(setUser({ user: data.user, session: data.session }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  await supabase.auth.signOut();
  dispatch(clearUser());
};

export const fetchSession = () => async (dispatch) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    dispatch(setUser({ user: session.user, session }));
  } else {
    dispatch(clearUser());
  }
};

export const resetUser = (email) => async (dispatch) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const signupUser = (email, password) => async (dispatch) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
