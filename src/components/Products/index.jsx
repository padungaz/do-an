import {
  // LaptopOutlined,
  // NotificationOutlined,
  // UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_ADMIN } from "../../routes/constants";
import AddTour from "../AddTour";
import CustomerManagement from "../CustomerManagement";
import Oder from "../Oder";

import "./style.css";

const { Header, Content } = Layout;
// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items = [
  {
    label: "Quản lý tour",
    key: "tour",
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

function Products() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[3];

  const arr = (e) => {
    // console.log("click ", e.key);
    navigate(`${ROUTES_ADMIN.PAGE_MANAGEMENT}/${e.key}`);
  };

  return (
    <>
      {" "}
      <Layout
        style={{
          position: "relative",
        }}
      >
        {/* <Header className="header"> */}
        <Menu
          onClick={arr}
          selectedKeys={[location]}
          mode="horizontal"
          items={items}
          defaultSelectedKeys={["tour"]}
        />
        {/* </Header> */}
        <Content
          style={{
            padding: "10px 0",
          }}
        >
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Content>
              {location === "tour" && <Oder />}
              {location === "oder" && <CustomerManagement />}
              {location === "add" && <AddTour />}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
export default Products;
