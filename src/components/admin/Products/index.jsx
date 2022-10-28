import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_ADMIN } from "../../../routes/constants";
import AllTourList from "../AllTourList";
import TourList from "../TourList";

import "./style.css";

const { Content } = Layout;
const items = [
  {
    label: "tổng hơp tour",
    key: "tour-list",
    icon: <MailOutlined />,
  },
  {
    label: "Danh sách tất cả các tour",
    key: "all-tour-list",
    icon: <AppstoreOutlined />,
  },
];

function Products() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[3];
  const arr = (e) => {
    navigate(`${ROUTES_ADMIN.PAGE_MANAGEMENT}/${e.key}`);
  };

  return (
    <>
      <Layout>
        <Menu
          onClick={arr}
          selectedKeys={[location]}
          mode="horizontal"
          items={items}
          defaultSelectedKeys={["tour"]}
        />
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
              {location === "tour-list" && <TourList />}
              {location === "all-tour-list" && <AllTourList />}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
export default Products;
