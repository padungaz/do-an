import styled from "styled-components";
// import media from "styles/breakpoints";
import { Layout as La } from "antd";

const { Header, Content, Sider } = La;

export const Layout = styled(La)`
  min-height: 100vh;
  background: #e5e5e5;
`;

export const Hd = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  width: 100%;

  &.ant-layout-header {
    padding-left: 32px !important;
    height: 70px;
    background: #ffffff !important;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.06) !important;
  }
`;

export const Sd = styled(Sider)`
  padding: 32px 0 32px 24px;
  position: sticky;
  margin-top: 70px;
  top: 70px;
  height: calc(100vh + 200px);
  overflow: auto;

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    background: #ee9416;
    border-radius: 22px 0px 0px 22px;
    color: #2c2c2c;
  }

  &.menu-user {
    height: calc(100vh - 70px);
  }
`;

export const Contents = styled(Content)`
  padding: 16px 24px;
  background: #f8f8f8 !important;
  margin-top: 70px;
`;
