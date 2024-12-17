import React from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { authServices } from "../../services/authServices";

export default function TempFormRegister({ setModalContent }) {
  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = async (values) => {
    const { name, email, password, phone, birthday, gender } = values;

    // Chuyển đổi giá trị giới tính cho API (true cho nam, false cho nữ)
    const genderValue =
      gender === "male" ? true : gender === "female" ? false : null;

    // Dữ liệu gửi lên API
    const data = {
      id: 0, // Không cần thiết trong API yêu cầu, có thể bỏ qua hoặc giữ lại.
      name: name,
      email: email,
      password: password,
      phone: phone,
      birthday: birthday.format("YYYY-MM-DD"), // Định dạng ngày sinh theo yêu cầu API
      gender: genderValue,
      role: "user", // Giả sử bạn đang tạo người dùng bình thường
    };
    authServices
      .register(data)
      .then((result) => {
        message.success("Đăng ký thành công");
        window.location.href = "/";
      })
      .catch((err) => {
        message.error("Đăng ký không thành công");
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">
        Đăng ký tài khoản Airbnb
      </h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        {/* Tên */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
        >
          <Input placeholder="Điền tên vào đây..." />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Điền email vào đây..." />
        </Form.Item>

        {/* Mật khẩu */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Điền số điện thoại..." />
        </Form.Item>

        {/* Ngày sinh và Giới tính */}
        <div className="flex gap-4">
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            className="flex-1"
          >
            <DatePicker className="w-full" placeholder="Chọn ngày sinh" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            className="flex-1"
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Nút gửi */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold h-10 rounded-md"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
