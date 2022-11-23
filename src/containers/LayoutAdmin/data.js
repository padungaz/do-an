import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const items = [
  {
    label: "Dashboard",
    key: "overview",
    icon: <MailOutlined />,
  },
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
  {
    label: "Đăng xuất",
    key: "log-out",
    icon: <LogoutOutlined />,
  },
];
