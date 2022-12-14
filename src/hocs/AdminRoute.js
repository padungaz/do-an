import React, { useEffect, Suspense } from "react";
import { Route } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import LayoutAdmin from "../components/LayoutAdmin";

// import { getMe, updateIsFirstAccess } from "store/other/authSlice";

// import { ROUTES } from "routes/constants";

// import Loading from "components/Loading";

// import webStorage from "utils/webStorage";
// import Layout from "components/Layout";
// import FirstLogin from "../containers/OtherPage/FirstLogin";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ element: Element, ...rest }) => {
  // const dispatch = useDispatch();
  // const navigation = useNavigate();

  // const isFirstAccess = useSelector(state => state.authReducer.isFirstAccess);
  // const isAuth = useSelector(state => state.authReducer.isAuth);
  // const currentUser = useSelector(state => state.authReducer.currentUser);

  // useEffect(() => {
  //   if (isFirstAccess) {
  //     const accessToken = webStorage.getToken();
  //     if (accessToken) {
  //       dispatch(getMe());
  //     } else {
  //       dispatch(updateIsFirstAccess());
  //     }
  //   }
  // }, [dispatch, isFirstAccess]);

  // useEffect(() => {
  //   if (!isAuth && !isFirstAccess) history.push(ROUTES.LOGIN);
  // }, [isAuth, isFirstAccess, history, currentUser]);

  // if (currentUser.ischangepass === 0) {
  //   return <FirstLogin />;
  // }
  // if (isFirstAccess) return <Loading />;

  return (
    <Route {...rest}>
      <LayoutAdmin>
        <Element />
      </LayoutAdmin>
    </Route>
  );
};
export default AdminRoute;
