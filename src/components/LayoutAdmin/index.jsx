import React, { useState } from "react";
// import "antd/dist/antd.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import Products from "../Products";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_ADMIN } from "../../routes/constants";

import "./style.scss";
import Title from "antd/lib/skeleton/Title";
// import Oder from "../Oder";

const { Header, Sider, Content } = Layout;

const items = [
  {
    label: "Dashboard",
    key: "overview",
    icon: <MailOutlined />,
  },
  // {
  //   label: "Quản lý tour",
  //   key: "tour",
  //   icon: <MailOutlined />,
  // },
  {
    label: "Quản lý tour",
    key: "products",
    icon: <MailOutlined />,
  },
  {
    label: "Quản lý đơn hàng",
    key: "oder",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Thêm Tour",
    key: "add",
    icon: <SettingOutlined />,
  },
];

const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  console.log("loca", location);

  const arr = (e) => {
    console.log("click ", e.key);
    e.key === "products"
      ? navigate(`${ROUTES_ADMIN.HOME}/${e.key}/tour`)
      : navigate(`${ROUTES_ADMIN.HOME}/${e.key}`);
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-layout-admin" />
          <Menu
            theme="dark"
            onClick={arr}
            selectedKeys={[location]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div>
              admin
              <Avatar style={{ margin: "10px" }} src="" />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <div className="cccc">
              {/* <Products arr={arr} /> */}
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
