import React from "react";
import { Button, Form, Input, message } from "antd";
import { authServices } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { setLoginData, setModalContent } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { bookingServices } from "../../services/bookingServices";

export default function TempFormLogin({ onLoginSuccess }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    authServices
      .login(values)
      .then((result) => {
        message.success("Đăng nhập thành công!");
        const userData = result.data.content;
        dispatch(setLoginData(userData));
        // lưu thông tin đăng nhập vào localStorage
        let loginJson = JSON.stringify(userData);
        localStorage.setItem("USER_LOGIN", loginJson);

        // dùng id user để lấy list phòng đã book => set localStorage
        bookingServices
          .searchBooking(userData.user.id)
          .then((result) => {
            const bookingData = result.data.content;
            // tạo array chứa id phòng đã book
            let listIdBookingClone = [];
            bookingData.map((room) => {
              return listIdBookingClone.push(room.maPhong);
            });
            let listIdBookingJson = JSON.stringify(listIdBookingClone);
            localStorage.setItem("LIST_ID_BOOKING", listIdBookingJson);
          })
          .catch((err) => {
            console.error(err);
          });

        // Gọi hàm đóng Modal
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        // Điều hướng đến trang cần
        navigate();
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
