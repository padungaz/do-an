import {
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
import TourList from "../TourList";

import "./style.css";

const { Header, Content } = Layout;
const items = [
  {
    label: "tổng hơp tour",
    key: "tour",
    icon: <MailOutlined />,
  },
  {
    label: "Danh sách tất cả các tour",
    key: "tour-list",
    icon: <AppstoreOutlined />,
  },
];

function Products() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[3];
  console.log("first", location);
  const arr = (e) => {
    console.log("click ", e.key);
    navigate(`${ROUTES_ADMIN.PAGE_MANAGEMENT}/${e.key}`);
  };

  return (
    <>
      {" "}
      <Layout>
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
              {location === "tour-list" && <TourList />}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
export default Products;
