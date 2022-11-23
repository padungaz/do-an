import React, { useEffect, useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ROUTES_ADMIN } from "../../routes/constants";

import { items } from "./data";

import * as S from "./styled";
import { checkLogin, logout } from "../../components/Auth";
import { useDispatch } from "react-redux";

const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const locations = useLocation().pathname;
  const location = locations.split("/")[2];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("locations", locations);
  useEffect(() => {
    if (checkLogin) {
      checkLogin.isAdmin === true
        ? navigate(locations)
        : navigate(ROUTES_ADMIN.ODER_MANAGEMENT);
    } else {
      navigate(ROUTES.LOGIN);
    }
    // dispatch(fetchAccount());
  }, [dispatch, navigate]);

  const arr = (e) => {
    if (e.key === "log-out") {
      logout();
      navigate(ROUTES.LOGIN);
    } else {
      e.key === "products"
        ? navigate(`${ROUTES_ADMIN.HOME}/${e.key}/tour-list`)
        : navigate(`${ROUTES_ADMIN.HOME}/${e.key}`);
    }
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
