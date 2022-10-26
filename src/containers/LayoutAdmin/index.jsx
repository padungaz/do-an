import React, { useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_ADMIN } from "../../routes/constants";

import { items } from "./data";

import * as S from "./styled";

const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  console.log("loca", location);

  const arr = (e) => {
    console.log("click ", e.key);
    e.key === "products"
      ? navigate(`${ROUTES_ADMIN.HOME}/${e.key}/tour-list`)
      : navigate(`${ROUTES_ADMIN.HOME}/${e.key}`);
  };

  return (
    <>
      <S.Layout>
        <S.Hd className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div>
            admin
            <Avatar src="" />
          </div>
        </S.Hd>
        <S.Layout>
          <S.Sd
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="menu-user"
          >
            <Menu
              theme="dark"
              onClick={arr}
              selectedKeys={[location]}
              mode="inline"
              items={items}
            />
          </S.Sd>

          <S.Layout>
            <S.Contents>{children}</S.Contents>
          </S.Layout>
        </S.Layout>
      </S.Layout>
    </>
  );
};

export default LayoutAdmin;
