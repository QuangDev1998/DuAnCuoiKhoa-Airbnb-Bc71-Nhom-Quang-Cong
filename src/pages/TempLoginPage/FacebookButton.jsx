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

    // Gọi Facebook Graph API để lấy thông tin người dùng
    fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          message.error("Không thể lấy thông tin từ Facebook.");
          return;
        }

        const user = {
          id: data.id,
          name: data.name,
          email: data.email || "No email provided", // Có thể không có email nếu người dùng không cấp quyền
          avatar: data.picture?.data?.url || "No avatar",
          birthday: "1998-12-22", // Có thể tùy chỉnh nếu cần thêm thông tin khác
          gender: false, // Thay thế bằng dữ liệu phù hợp nếu có
          phone: "0328984656",
          role: "USER",
        };

        // Lưu thông tin người dùng vào Redux hoặc localStorage
        dispatch(setLoginData({ user }));
        localStorage.setItem("USER_LOGIN", JSON.stringify({ user }));
        // Lấy danh sách phòng đã đặt
        dispatch(getListIdBookingAction(user.id));

        // Điều hướng về trang chính
        navigate("/");

        message.success(`Welcome, ${user.name}!`);
        if (onLoginSuccess) {
          onLoginSuccess();
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
          padding: "20px",
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
