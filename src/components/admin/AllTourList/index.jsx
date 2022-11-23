import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTour } from "../../../store/admin/tourSlice";
import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";
import AddTour from "../../AddTour";
import Table from "../../Table";
import { sizeOptions } from "../../../constants";

import "./style.scss";

const breadcrumbs = [
  { content: "Quản lý tour", link: "" },
  { content: "Danh sách tour chi tiết", link: ROUTES_ADMIN.ALL_TOUR_LIST },
];

const AllTourList = () => {
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const [perPage, setPerPage] = useState(sizeOptions[1].value);
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      per_page: perPage,
      page,
    };

    if (nameSearch) filters.name = nameSearch;

    dispatch(fetchTour(filters));
  }, [dispatch, page, perPage, nameSearch]);

  const data = useSelector((state) => state.tourReducer.tours);

  const arr = (record) => {
    setShow("");
    setValue(record);
  };

  const columns = [
    {
      title: "Tour",
      dataIndex: "nameTour",
      key: "nameTour",
      sorter: (a, b) => a?.nameTour?.localeCompare(b?.nameTour),
      width: "30%",
    },
    {
      title: "Time",
      dataIndex: "rangePicker",
      key: "rangePicker",
      width: "20%",
      render: (_, record, index) =>
        record.rangePicker.startDate + "  -  " + record.rangePicker.endDate,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a?.address?.localeCompare(b?.address),
    },
    {
      title: "số lượng đặt",
      dataIndex: "numberOder",
      key: "numberOder",
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "số lượng khách",
      dataIndex: "numberpeople",
      key: "numberpeople",
    },
  ];
  return (
    <>
      <div className="wraper">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        {/* <Space
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          <Search
            placeholder="Nhập tên tour"
            onChange={(e) => onSearch(e.target.value)}
            allowClear
            enterButton
          />
        </Space> */}
        <div className="aaa">
          <Table
            columns={columns}
            data={data}
            title="TẤT CẢ NHÂN VIÊN"
            placeholder="Tìm nhân viên"
            set_per_page={setPerPage}
            per_page={perPage}
            set_page={setPage}
            page={page}
            set_filter={setShowFilter}
            total={50}
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
              </div>
              <div className="scroll">
                <AddTour item={value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTourList;
