import React, { useRef, useState } from "react";
// import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import Highlighter from "react-highlight-words";
import "./style.scss";
import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";

const breadcrumbs = [
  { content: "Quản lý tour", link: "" },
  { content: "Danh sách tour chi tiết", link: ROUTES_ADMIN.ALL_TOUR_LIST },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "8",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "9",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "10",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "11",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "12",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "13",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "14",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "15",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "16",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "17",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "18",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "19",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "20",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "21",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "22",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "23",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "24",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "25",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

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
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
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
          <Button>Sort age</Button>
          <Button>Clear filters</Button>
          <Button>Clear filters and sorters</Button>
        </Space>
        <div className="aaa">
          <Table
            columns={columns}
            dataSource={data}
            rowClassName={(_, index) => index % 2 === 0 && "table-row-dark"}
            // scroll={{
            //   x: "calc(700px + 50%)",
            //   y: 400,
            // }}
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

export default Booking;
