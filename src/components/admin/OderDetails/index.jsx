import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useParams } from "react-router-dom";

import { fetchTour } from "../../../store/admin/tourSlice";
import { fetchClient } from "../../../store/admin/clientSlice";
import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";

import "./style.scss";

const OderDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [statu, setStatu] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const { name } = useParams();

  const breadcrumbs = [
    { content: "Quản lý tour", link: "" },
    { content: "Danh sách tour", link: ROUTES_ADMIN.ALL_TOUR_LIST },
    { content: `${name}`, link: ROUTES_ADMIN.TOUR_DETAIL },
  ];

  useEffect(() => {
    dispatch(fetchTour());
    dispatch(fetchClient());
  }, [dispatch]);

  const tourArray = useSelector((state) => state.tourReducer.tours);
  const datas = useSelector((state) => state.clientReducer.clients);

  const dataTour = tourArray?.filter((item) => item?.nameTour === name);

  // console.log("datas", datas);
  // console.log("dataTour", dataTour);
  const arr = (record) => {
    console.log("aaaa", record);
    setShow("");
    setValue(record);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "nameClient",
      key: "nameClient",
      width: "30%",
      ...getColumnSearchProps("nameClient"),
    },
    {
      title: "Age",
      dataIndex: "birthday",
      key: "birthday",
      width: "20%",
      ...getColumnSearchProps("birthday"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const renderItem = () => {
    return dataTour?.map((item) => {
      const newData = datas?.filter((el) => el?.tourId === item?.id);
      return (
        <div key={item?.id}>
          <h1>{item?.nameTour}</h1>
          <h2>mã tour: </h2> <span>{item?.id}</span>
          <div className="aaa">
            <Table
              columns={columns}
              dataSource={newData}
              rowClassName={(_, index) => index % 2 === 0 && "table-row-dark"}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    arr(record);
                  },
                };
              }}
              style={{
                width: "100%",
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
                  <p>{value.nameTour}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="wraper">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {renderItem()}
    </div>
  );
};

export default OderDetails;
