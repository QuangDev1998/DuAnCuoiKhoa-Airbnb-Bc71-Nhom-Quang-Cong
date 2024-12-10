import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function TempFormRegister() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">
        Đăng ký tài khoản Airbnb
      </h2>
      <Form layout="vertical" initialValues={{ remember: true }}>
        {/* Name */}
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
          <Input placeholder="Điền tên vào đây..." />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Điền số điện thoại..." />
        </Form.Item>

        {/* Birthday & Gender */}
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

        {/* Submit Button */}
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
