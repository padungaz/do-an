import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.min.css";

import GlobalStyle from "./styles/globalStyle";
import store from "./store";
import theme from "./styles/theme";
import Routing from "./routes";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routing />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
