import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.min.css";

import LayoutAdmin from "./components/LayoutAdmin";
// import CustomerManagement from "./components/CustomerManagement";
// import PaymentMethods from "./components/PaymentMethods";
// import OderDetails from "./components/OderDetails";
import ProducUser from "./components/ProducUser";
// import AddTour from "./components/AddTour";
import GlobalStyle from "./styles/globalStyle";
import store from "./store";

import theme from "./styles/theme";
// import AdminPage from "./containers/AdminPage";
// import Oder from "./components/Oder";
// import Products from "./components/Products";
// import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <LayoutAdmin /> */}
        {/* <CustomerManagement /> */}
        {/* <PaymentMethods /> */}
        {/* <OderDetails /> */}
        {/* <ProducUser /> */}
        {/* <AddTour /> */}
        {/* <AdminPage /> */}
        {/* <Oder /> */}
        {/* <Products /> */}
        <Routing />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
