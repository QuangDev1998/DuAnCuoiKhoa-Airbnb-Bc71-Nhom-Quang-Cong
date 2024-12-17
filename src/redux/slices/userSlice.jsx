import { createSlice } from "@reduxjs/toolkit";
let loginJson = localStorage.getItem("USER_LOGIN");
const initialState = {
  loginData: loginJson ? JSON.parse(loginJson) : null,
  isModalOpen: false,
  modalContent: "login",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setModalContent: (state, action) => {
      state.modalContent = action.payload;
    },
  },
});

export const { setLoginData, setIsModalOpen, setModalContent } =
  userSlice.actions;

export default userSlice.reducer;
