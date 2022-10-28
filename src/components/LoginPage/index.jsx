import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";

import * as S from "./styled";

function LoginPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const loginArr = useSelector((state) => state.accountReducer.accounts);
  // console.log("loginArr", loginArr);

  // useEffect(() => {
  //   if (checkLogin()) {
  //     navigate("/");
  //   }
  //   dispatch(fetchAccount());
  // }, [dispatch]);

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   login(values.username, values.password, loginArr, (user) => {
  //     if (user.isAdmin) {
  //       navigate("/admin");
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // };

  return (
    <S.Wrapper>
      <S.Header>{/* <img src={""} alt=" " /> */}</S.Header>
      <S.Form>
        <S.Title>ĐĂNG NHẬP</S.Title>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
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
