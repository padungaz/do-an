import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sizeOptions } from "../../../constants";

import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";
import { fetchClient } from "../../../store/admin/clientSlice";
import Table from "../../Table";

import "./style.scss";

// const { Search } = Input;

const breadcrumbs = [
  { content: "Đơn hàng", link: "" },
  { content: "Danh sách khách hàng", link: ROUTES_ADMIN.ODER_MANAGEMENT },
];

const CustomerManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const [perPage, setPerPage] = useState(sizeOptions[1].value);
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState(null);

  console.log("perPage", perPage);

  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clientReducer.clients);

  const arr = (record) => {
    console.log("aaa", record);
    setShow("");
    setValue(record);
  };

  useEffect(() => {
    const filters = {
      per_page: perPage,
      page,
    };

    if (nameSearch) filters.name = nameSearch;

    dispatch(fetchClient(filters));
  }, [dispatch, page, perPage, nameSearch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "nameClient",
      key: "nameClient",
    },
    {
      title: "Age",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <div className="wraper">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="aaa">
          <Table
            columns={columns}
            data={clients}
            title="TẤT CẢ NHÂN VIÊN"
            placeholder="Tìm nhân viên"
            set_per_page={setPerPage}
            per_page={perPage}
            set_page={setPage}
            page={page}
            set_filter={setShowFilter}
            total={12}
            arr={arr}
            set_subject={setNameSearch}
            style={{
              minWidth: "100vw",
            }}
          />
          <div
            className="bbbbb"
            style={{
              display: `${show}`,
            }}
          >
            <div>
              <div>
                <button onClick={() => setShow("none")}>x</button>
                {/* <p>{value.nameTour}</p> */}
              </div>

              <div>
                {/* <button onClick={() => handleDetail(value.nameTour)}>
                {" "}
                details{" "}
              </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerManagement;
