import styled from "styled-components";

export const Wrap = styled.div`
  background: white;
  width: 40%;
  margin-left: 10px;
  border: 2px solid #22b4e1;
  border-radius: 10px;
  height: auto;
  position: sticky;
  /* position:-webkit-sticky; */
  top: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  border-bottom: 2px solid #22b4e1;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  padding: 5px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
`;
