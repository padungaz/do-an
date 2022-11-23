import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  padding: 50px 50px 150px;
  width: 100%;
  height: 100vh;

  background: url("");
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  flex-basis: 20%;
  text-align: center;
  margin-bottom: 48px;
`;

export const Form = styled.div`
  width: 459px;
  background: #ffffff;
  box-shadow: 0px 41px 56px rgba(0, 18, 101, 0.12);
  border-radius: 16px;
  padding: 40px 48px;
  max-height: 500px;
`;

export const Title = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #303841;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: center;
  padding-bottom: 28px;
`;

export const ErrorMessage = styled.div`
  display: flex;
  font-size: 14px;
  font-style: italic;
  line-height: 20px;
  color: #ee9416;
  margin-bottom: 34px;
`;
