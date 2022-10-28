import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import Breadcrumb from "../../Breadcrumb";
import { ROUTES_ADMIN } from "../../../routes/constants";
import { fetchClient } from "../../../store/admin/clientSlice";

import "./style.scss";

const { Search } = Input;

const breadcrumbs = [
  { content: "Đơn hàng", link: "" },
  { content: "Danh sách khách hàng", link: ROUTES_ADMIN.ODER_MANAGEMENT },
];

const CustomerManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const clients = useSelector((state) => state.clientReducer.clients);
  const [data, setData] = useState(clients);

  const onSearch = debounce((value) => {
    const arr = clients?.filter((item) =>
      value
        ? item?.nameTour
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          item?.nameClient
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

export default CustomerManagement;
