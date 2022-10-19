import React, { useEffect, useRef, useState } from "react";
// import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import Highlighter from "react-highlight-words";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTour } from "../../store/admin/tourSlice";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES_ADMIN } from "../../routes/constants";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "5",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "6",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "7",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "8",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "9",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

const Oder = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTour());
  }, [dispatch]);

  const tourArray = useSelector((state) => state.tourReducer.tours);

  const allNameTour = tourArray?.map((item) => item?.nameTour);

  const nameTours = allNameTour.reduce((acc, el) => {
    if (acc.indexOf(el) === -1) {
      acc.push(el);
    }
    return acc;
  }, []);

  const tourListByName = nameTours?.map((item) =>
    tourArray.filter((el) => el.nameTour === item)
  );

  const data = tourListByName.map((item, i) => ({
    nameTour: nameTours[i],
    numberOder: item?.map((el) => el?.numberOder)
      ? item?.map((el) => el?.numberOder)?.reduce((acc, e) => acc + e)
      : 0,
    numberpeople: item?.map((el) => el?.numberpeople)
      ? item?.map((el) => el?.numberpeople)?.reduce((acc, e) => acc + e)
      : 0,
  }));

  console.log("data", data);
  // console.log("tourListByName", tourListByName);
  // console.log("nameTours", nameTours);
  // console.log("todoArray", tourArray);
  // console.log("allNameTour", allNameTour);

  const handleDetail = (nameTour) => {
    navigate(
      generatePath(ROUTES_ADMIN.TOUR_DETAIL, {
        name: nameTour,
      })
    );
  };
  const arr = (record) => {
    // console.log("aaaa", record);
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
      title: "NameTour",
      dataIndex: "nameTour",
      key: "nameTour",
      width: "30%",

      ...getColumnSearchProps("nameTour"),
    },
    {
      title: "Số lượng tour được đặt",
      dataIndex: "numberOder",
      key: "numberOder",
      width: "20%",
      ...getColumnSearchProps("numberOder"),
    },
    {
      title: "Số lượng khách",
      dataIndex: "numberpeople",
      key: "numberpeople",
      width: "20%",
      ...getColumnSearchProps("numberpeople"),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <>
      <div className="eee">
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={(_, index) => index % 2 === 0 && "table-row-dark"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                arr(record);
                // console.log("aaaa", record.key);
              },
            };
          }}
          style={{ width: "68%" }}
        />
        {/* <div
          style={{
            width: "30%",
            height: "inherit",
            border: "2px solid red",
          }}
        >
          sdfghjkl
        </div> */}
      </div>

      <div
        className="bbbb"
        style={{
          display: `${show}`,
        }}
      >
        <h1>{value.nameTour}</h1>
        <button onClick={() => setShow("none")}>x</button>
        <div>
          <button onClick={() => handleDetail(value.nameTour)}>
            {" "}
            details{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Oder;
