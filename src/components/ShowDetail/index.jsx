import React, { useState } from "react";
import PropTypes from "prop-types";

import * as S from "./styled";
import AddTour from "../AddTour";
import Modal from "../Modal";

ShowDetails.propTypes = {
  show: PropTypes.string,
  handleDetail: PropTypes.func,
  value: PropTypes.any,
};

export default function ShowDetails({
  show,
  setShow,
  handleDetail,
  value,
  children,
  page,
  perPage,
}) {
  const [edit, setEdit] = useState({
    open: false,
  });
  return (
    <S.Wrap
      style={{
        display: `${show}`,
      }}
    >
      {edit?.open && (
        <Modal
          open={edit}
          has_button={false}
          width="514px"
          $borderRadius="16px"
          onCancel={() => setEdit(false)}
        >
          <AddTour
            onCancel={() => setEdit(false)}
            edit={edit}
            perPage={perPage}
            page={page}
          />
        </Modal>
      )}
      <S.Header>
        <p onClick={setShow}>x</p>
        <p onClick={() => setEdit({ open: true, value: value })}>edit</p>
        <p onClick={() => setEdit({ open: true, value: [] })}>add</p>
      </S.Header>

      <S.Content>{children}</S.Content>

      <S.Footer>
        <button onClick={() => handleDetail(value?.nameTour)}> details </button>
      </S.Footer>
    </S.Wrap>
  );
}
