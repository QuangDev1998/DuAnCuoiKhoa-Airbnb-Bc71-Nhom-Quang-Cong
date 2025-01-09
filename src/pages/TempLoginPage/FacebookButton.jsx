import React, { useEffect } from "react";
import { FacebookLogin } from "react-facebook-login-lite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setLoginData } from "../../redux/slices/userSlice";
import { getListIdBookingAction } from "../../redux/thunks/bookingThunks";

const FacebookButton = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      console.log("User from session:", savedUser);
    }
  }, []);

  const handleSuccess = (response) => {
    const { authResponse } = response || {};
    const accessToken = authResponse?.accessToken;

    if (!accessToken) {
      message.error("Không thể lấy Access Token từ Facebook.");
      return;
    }

    // Gửi Access Token đến API backend để xác thực
    fetch("http://localhost:5000/api/facebook-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Authentication successful") {
          message.success(`Welcome, ${data.user.name}!`);
          const user = {
            id: 43792,
            birthday: "12-07-2023",
            gender: false,
            phone: "0123456789",
            role: "ADMIN",
            email: data.user.email,
            name: data.user.name,
            avatar: data.user.picture,
          };

          // Lưu thông tin người dùng vào Redux hoặc localStorage
          dispatch(setLoginData({ user }));

          localStorage.setItem("USER_LOGIN", JSON.stringify({ user }));
          //   localStorage.setItem("USER_LOGIN", JSON.stringify(data.user));

          // Lấy danh sách phòng đã đặt
          dispatch(getListIdBookingAction(data.user.id));

          // Điều hướng về trang chính
          navigate("/");
        } else {
          message.error(data.message || "Đăng nhập thất bại.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        message.error("Đăng nhập thất bại. Vui lòng thử lại.");
      });
  };

  const handleFailure = (error) => {
    console.error("Facebook login failed:", error);
    alert("Login failed. Please try again.");
  };

  return (
    <div>
      <FacebookLogin
        appId="8939394042796946" // Thay bằng App ID của bạn
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        scope="public_profile,email" // Yêu cầu quyền
        buttonStyle={{
          padding: "10px",
          background: "#4267B2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign in with Facebook
      </FacebookLogin>
    </div>
  );
};

export default FacebookButton;
