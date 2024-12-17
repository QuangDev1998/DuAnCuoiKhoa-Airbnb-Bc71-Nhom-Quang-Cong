import React, { useState } from "react";
import {
  AimOutlined,
  CalendarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink, useLocation, useParams } from "react-router-dom";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function Slider({ content }) {
  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation(); // lấy location.pathname để cập nhật state cho defaultSelectedKeys của Menu
  // data cho component Menu
  const items = [
    getItem(
      <NavLink to="/admin/QuanLyNguoiDung">Quản lý người dùng</NavLink>,
      "/admin/QuanLyNguoiDung",
      <UserOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyViTri">Quản lý vị trí</NavLink>,
      "/admin/QuanLyViTri",
      <AimOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyPhong">Quản lý phòng</NavLink>,
      "/admin/QuanLyPhong",
      <HomeOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyBooking">Quản lý booking</NavLink>,
      "/admin/QuanLyBooking",
      <CalendarOutlined />
    ),
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        paddingTop: "112px",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={[location.pathname]}
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
