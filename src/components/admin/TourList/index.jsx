import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, AudioOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";

import { ROUTES_ADMIN } from "../../../routes/constants";
import { fetchTour } from "../../../store/admin/tourSlice";
import Breadcrumb from "../../Breadcrumb";

import "./style.scss";

const { Search } = Input;

const breadcrumbs = [
  { content: "Quản lý tour", link: "" },
  { content: "Danh sách tour", link: ROUTES_ADMIN.TOUR_lIST },
];

const TourList = () => {
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

  const onSearch = (value) => {
    console.log(value);
  };

  const tourListByName = nameTours?.map((item) =>
    tourArray.filter((el) => el.nameTour === item)
  );

  const data = tourListByName.map((item, i) => ({
    nameTour: nameTours[i],
    status: item?.filter((el) => el?.status)?.length,
    numberOder: item?.map((el) => el?.numberOder)?.reduce((acc, e) => acc + e),
    numberpeople: item
      ?.map((el) => el?.numberpeople)
      ?.reduce((acc, e) => acc + e),
  }));

  const handleDetail = (nameTour) => {
    navigate(
      generatePath(ROUTES_ADMIN.TOUR_DETAIL, {
        name: nameTour,
      })
    );
  };
  const arr = (record) => {
    setShow("");
    setValue(record);
  };

  const handleSearch = (selectedKeys, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
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
          onPressEnter={() => handleSearch(selectedKeys, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, dataIndex)}
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
            onSearch={onSearch}
            allowClear
            enterButton
          />
        </Space>
        <div className="aaa">
          <Table
            columns={columns}
            dataSource={data}
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
                <button>edit</button>
              </div>

              <p>{value.nameTour}</p>
              <p>{value.nameTour}</p>
              <p>{value.nameTour}</p>
            </div>

            <div>
              <button onClick={() => handleDetail(value.nameTour)}>
                {" "}
                details{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourList;
