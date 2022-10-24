import { Route } from "react-router-dom";

NonAuthRoute.propTypes = {
  element: PropTypes.any,
};

function NonAuthRoute({ element: element, ...rest }) {
  return (
    <Route {...rest}>
      <element />
    </Route>
  );
}

export default NonAuthRoute;
