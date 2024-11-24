import React from "react";
import { Button, Form, Input, message } from "antd";
import { authServices } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { setLoginData } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function TempFormLogin() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    authServices
      .login(values)
      .then((result) => {
        message.success("Login success");
        dispatch(setLoginData(result.data.content));
        let loginJson = JSON.stringify(result.data.content);
        localStorage.setItem("USER_LOGIN", loginJson);
        navigate("/admin/QuanLyNguoiDung");
      })
      .catch((err) => {
        console.log(err);
        message.error("Login fail");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>TempFormLogin</h1>
      <Form
        layout="vertical"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          email: "string2@gmail.com",
          password: "string123",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
