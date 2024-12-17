import React from "react";
import { Button, Form, Input, message } from "antd";
import { authServices } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { setLoginData, setModalContent } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

export default function TempFormLogin({ onLoginSuccess }) {
  const { isModalOpen, modalContent } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    authServices
      .login(values)
      .then((result) => {
        message.success("Đăng nhập thành công!");
        dispatch(setLoginData(result.data.content));
        let loginJson = JSON.stringify(result.data.content);
        localStorage.setItem("USER_LOGIN", loginJson);

        // Gọi hàm đóng Modal
        if (onLoginSuccess) {
          onLoginSuccess();
        }

        // Điều hướng đến trang quản lý người dùng
        navigate("/");
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại, vui lòng thử lại!");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div>
      {/* Tiêu đề */}
      <h2 className="text-xl font-semibold text-center mb-6">
        Đăng nhập Airbnb
      </h2>

      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          email: "string2@gmail.com",
          password: "string123",
        }}
      >
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Vui lòng nhập tài khoản" />
        </Form.Item>

        {/* Mật khẩu */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Vui lòng nhập mật khẩu" />
        </Form.Item>

        {/* Button Đăng ký và Đăng nhập */}
        <div className="flex justify-between mt-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 rounded-md"
            onClick={() => {
              dispatch(setModalContent("register"));
            }}
          >
            Đăng ký
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-black hover:bg-gray-800 text-white font-medium px-6 rounded-md"
          >
            Đăng nhập
          </Button>
        </div>
      </Form>
    </div>
  );
}
