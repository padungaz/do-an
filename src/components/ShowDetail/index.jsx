import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

ShowDetails.propTypes = {
  show: PropTypes.bool,
  handleDetail: PropTypes.bool,
  value: PropTypes.bool,
};

export default function ShowDetails({ show, handleDetail, value, children }) {
  return (
    <div
      className="bbbbb"
      style={{
        display: `${show}`,
      }}
    >
      {children}

      <div>
        <button onClick={() => handleDetail(value.nameTour)}> details </button>
      </div>
    </div>
  );
}
