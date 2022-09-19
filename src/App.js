import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import LayoutAdmin from "./components/LayoutAdmin";
import GlobalStyle from "./styles/globalStyle";
import { store } from "./store";

import theme from "./styles/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LayoutAdmin />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
