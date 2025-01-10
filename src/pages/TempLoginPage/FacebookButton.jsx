import React, { useEffect } from "react";
import { FacebookLogin } from "react-facebook-login-lite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setLoginData } from "../../redux/slices/userSlice";
import { getListIdBookingAction } from "../../redux/thunks/bookingThunks";
import { authServices } from "../../services/authServices";

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
        authServices
          .login({ email: "quangleminhdev999@gmail.com", password: "123a" })
          .then((result) => {
            message.success("Đăng nhập thành công!");
            let userDataTemp = result.data.content;
            userDataTemp.user.avatar = data.picture?.data?.url;
            let userData = { ...userDataTemp };
            dispatch(setLoginData(userData));
            // lưu thông tin đăng nhập vào localStorage
            let loginJson = JSON.stringify(userData);
            localStorage.setItem("USER_LOGIN", loginJson);
            // dùng id user để lấy list phòng đã book => set localStorage
            dispatch(getListIdBookingAction(userData.user.id));
            navigate();
          })
          .catch((err) => {
            message.error("Đăng nhập thất bại, vui lòng thử lại!");
            console.error(err);
          });

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
    <div className="mt-3">
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
        btnText="Đăng nhập bằng Facebook"
      >
        Đăng nhập bằng Facebook
      </FacebookLogin>
    </div>
  );
};

export default FacebookButton;
