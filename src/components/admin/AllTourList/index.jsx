import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import debounce from "lodash.debounce";

import { useDispatch, useSelector } from "react-redux";
import { fetchTour } from "../../../store/admin/tourSlice";
import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";
import AddTour from "../../AddTour";

import "./style.scss";

const { Search } = Input;

const breadcrumbs = [
  { content: "Quản lý tour", link: "" },
  { content: "Danh sách tour chi tiết", link: ROUTES_ADMIN.ALL_TOUR_LIST },
];

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
//     key: "10",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "11",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "12",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "13",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "14",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "15",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "16",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "17",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "18",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "19",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "20",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "21",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "22",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "23",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "24",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "25",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

const AllTourList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTour());
  }, [dispatch]);

  const tours = useSelector((state) => state.tourReducer.tours);
  const [data, setData] = useState(tours);

  const onSearch = debounce((value) => {
    const arr = tours?.filter((item) =>
      value
        ? item?.nameTour
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim())
        : item
    );
    setData(arr);
  }, 1000);

  const arr = (record) => {
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
      title: "Tour",
      dataIndex: "nameTour",
      key: "nameTour",
      width: "30%",
      ...getColumnSearchProps("nameTour"),
    },
    {
      title: "Time",
      dataIndex: "rangePicker",
      key: "rangePicker",
      width: "20%",
      render: (_, record, index) =>
        record.rangePicker.startDate + "  -  " + record.rangePicker.endDate,
      // ...getColumnSearchProps(""),
    },
    {
      title: "Address",
      // dataIndex: "address",
      key: "address",
      // ...getColumnSearchProps("address"),
    },
  ];
  return (
    <>
      <div className="wraper">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Space
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          <Search
            placeholder="input search text"
            onChange={(e) => onSearch(e.target.value)}
            allowClear
            enterButton
          />
        </Space>
        <div className="aaa">
          <Table
            columns={columns}
            dataSource={data}
            rowClassName={(_, index) => index % 2 === 0 && "table-row-dark"}
            scroll={{
              x: "auto",
              y: 700,
            }}
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
