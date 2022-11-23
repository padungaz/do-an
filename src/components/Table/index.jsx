import React, { useEffect } from "react";
import _debounce from "lodash/debounce";
import PropTypes from "prop-types";
import { Input, Pagination, Select } from "antd";

import { sizeOptions } from "../../constants";

import iconSearch from "../../assets/icons/iconSearch.svg";
import iconFilter from "../../assets/icons/iconFilter.svg";
import noData from "../../assets/icons/No-data.svg";

import * as S from "./styled";

Table.propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string,
  columns: PropTypes.any,
  title: PropTypes.string,
  set_per_page: PropTypes.any,
  per_page: PropTypes.any,
  total: PropTypes.number,
  set_page: PropTypes.any,
  page: PropTypes.number,
  set_filter: PropTypes.any,
  filter: PropTypes.bool,
  has_filter: PropTypes.bool,
  arr: PropTypes.any,
};
function Table({
  data,
  columns,
  title,
  placeholder,
  set_filter,
  filter,
  set_per_page,
  per_page,
  total,
  set_page,
  page,
  set_subject,
  scroll,
  has_filter = true,
  has_search = true,
  checked,
  arr,
}) {
  const handleChangeSearch = _debounce((value) => {
    set_subject(value);
  }, 400);

  useEffect(() => {
    set_page(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [per_page]);

  return (
    <>
      <S.Wrap>
        <S.Header>
          <S.Dflex
            gap="0px"
            style={{
              flexDirection: "column",
            }}
          >
            <S.Dflex
              className="reponsive-title"
              gap="28px"
              style={{ width: "100%" }}
            >
              {title && <div>{title}</div>}
              {has_search && (
                <Input
                  style={{ background: "#ffffff" }}
                  // $width="229px"
                  placeholder={placeholder}
                  icon={iconSearch}
                  // $isHeader
                  onChange={(e) => handleChangeSearch(e.target.value)}
                />
              )}
            </S.Dflex>
          </S.Dflex>

          <S.Dflex
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {has_filter && (
              <S.Dflex
                onClick={() => set_filter(true)}
                style={{
                  cursor: "pointer",
                  justifyContent: "flex-end",
                }}
              >
                <img src={iconFilter} alt="" />
                <div style={{ whiteSpace: "nowrap" }}>Bộ lọc nâng cao</div>
              </S.Dflex>
            )}
          </S.Dflex>
        </S.Header>

        <S.Dflex style={{ justifyContent: "space-between" }}>
          <S.Dflex style={{ marginTop: "16px" }}>
            <div>Hiển thị</div>
            <Select
              value={per_page}
              onChange={(selected) => set_per_page(selected)}
              options={sizeOptions}
              style={{
                width: 80,
              }}
            />
          </S.Dflex>
          <S.Dflex
            className="reponsive-pagination"
            gap="10px"
            style={{
              width: "20vw",
              justifyContent: "flex-end",
              marginTop: "0px",
            }}
          >
            <h2>Trang</h2>
            <Pagination
              pageSize={per_page}
              simple
              defaultCurrent={1}
              current={page}
              onChange={(page) => set_page(page)}
              total={total}
              size="small"
            />
          </S.Dflex>
        </S.Dflex>
        <S.WrapTable>
          <S.Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={data}
            rowClassName={(_, index) => index % 2 === 0 && "table-row-dark"}
            style={{ borderRadius: "10px" }}
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => arr(record),
              };
            }}
            scroll={scroll}
            locale={{
              emptyText: (
                <span>
                  <img src={noData} alt="" />
                </span>
              ),
            }}
          />
        </S.WrapTable>
      </S.Wrap>
    </>
  );
}

export default Table;
