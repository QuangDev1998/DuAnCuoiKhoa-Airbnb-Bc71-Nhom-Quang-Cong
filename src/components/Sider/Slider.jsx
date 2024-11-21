import React, { useState } from "react";
import {
  AimOutlined,
  CalendarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <NavLink to="/admin/QuanLyNguoiDung">Quản lý người dùng</NavLink>,
    "1",
    <UserOutlined />
  ),
  getItem(
    <NavLink to="/admin/QuanLyViTri">Quản lý vị trí</NavLink>,
    "2",
    <AimOutlined />
  ),
  getItem(
    <NavLink to="/admin/QuanLyPhong">Quản lý phòng</NavLink>,
    "3",
    <HomeOutlined />
  ),
  getItem(
    <NavLink to="/admin/QuanLyBooking">Quản lý booking</NavLink>,
    "4",
    <CalendarOutlined />
  ),
];
export default function Slider({ content }) {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content className="bg-white">
          <div>{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
