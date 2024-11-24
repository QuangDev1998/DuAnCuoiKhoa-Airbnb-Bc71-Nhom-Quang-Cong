import { createSlice } from "@reduxjs/toolkit";
let loginJson = localStorage.getItem("USER_LOGIN");
const initialState = {
  loginData: loginJson ? JSON.parse(loginJson) : null,
  token: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
      state.token = action.payload.token;
    },
  },
});

export const { setLoginData } = userSlice.actions;

export default userSlice.reducer;
