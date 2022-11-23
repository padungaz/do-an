import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { ROUTES, ROUTES_ADMIN } from "../../routes/constants";

import { fetchAccount } from "../../store/admin/accountSlice";
import { checkLogin, login } from "../Auth";

import * as S from "./styled";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginArr = useSelector((state) => state.accountReducer.accounts);
  console.log("loginArr", loginArr);

  useEffect(() => {
    if (checkLogin) {
      checkLogin.isAdmin === true
        ? navigate(ROUTES_ADMIN.OVERVIEW_PAGE)
        : navigate(ROUTES_ADMIN.ODER_MANAGEMENT);
    } else {
      navigate(ROUTES.LOGIN);
    }
    dispatch(fetchAccount());
  }, [dispatch, navigate]);

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values.username, values.password, loginArr, (user) => {
      if (user.isAdmin) {
        navigate(ROUTES_ADMIN.OVERVIEW_PAGE);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <S.Wrapper>
      <S.Header>{/* <img src={""} alt=" " /> */}</S.Header>
      <S.Form>
        <S.Title>ĐĂNG NHẬP</S.Title>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng Nhập
            </Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </S.Form>
      {/* <ForgotPassModal
        show={showModal}
        setShow={setShowModal}
      ></ForgotPassModal> */}
    </S.Wrapper>
  );
}

export default LoginPage;
