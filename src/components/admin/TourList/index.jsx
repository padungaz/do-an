import React, { useEffect, useRef, useState } from "react";
// import { SearchOutlined /* , AudioOutlined */ } from "@ant-design/icons";
// import { Button, Input, Space, Table } from "antd";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Highlighter from "react-highlight-words";
// import debounce from "lodash.debounce";

import { ROUTES_ADMIN } from "../../../routes/constants";
import { fetchTour } from "../../../store/admin/tourSlice";
import Breadcrumb from "../../Breadcrumb";

import "./style.scss";
import { sizeOptions } from "../../../constants";
import Table from "../../Table";
import ShowDetails from "../../ShowDetail";

// const { Search } = Input;

const breadcrumbs = [
  { content: "Quản lý tour", link: "" },
  { content: "Danh sách tour", link: ROUTES_ADMIN.TOUR_lIST },
];

const TourList = () => {
  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef(null);
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const [perPage, setPerPage] = useState(sizeOptions[1].value);
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      per_page: perPage,
      page,
    };

    if (nameSearch) filters.name = nameSearch;

    dispatch(fetchTour(filters));
  }, [dispatch, page, perPage, nameSearch]);

  const tourArray = useSelector((state) => state.tourReducer.tours);
  const [tours, setTours] = useState(tourArray);

  // const allNameTour =
  //   search === ""
  //     ? tourArray.map((item) => item?.nameTour)
  //     : tours?.map((item) => item?.nameTour);

  // const nameTours = allNameTour.reduce((acc, el) => {
  //   if (acc.indexOf(el) === -1) {
  //     acc.push(el);
  //   }
  //   return acc;
  // }, []);

  // const tourListByName = nameTours?.map((item) =>
  //   search === ""
  //     ? tourArray.filter((el) => el.nameTour === item)
  //     : tours.filter((el) => el.nameTour === item)
  // );

  // const data = tourListByName?.map((item, i) => ({
  //   nameTour: nameTours[i],
  //   status: item?.filter((el) => el?.status)?.length,
  //   numberOder: item?.map((el) => el?.numberOder)?.reduce((acc, e) => acc + e),
  //   numberpeople: item
  //     ?.map((el) => el?.numberpeople)
  //     ?.reduce((acc, e) => acc + e),
  // }));

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

  const data = tourListByName?.map((item, i) => ({
    nameTour: nameTours[i],
    status: item?.filter((el) => el?.status)?.length,
    numberOder: item?.map((el) => el?.numberOder)?.reduce((acc, e) => acc + e),
    numberpeople: item
      ?.map((el) => el?.numberpeople)
      ?.reduce((acc, e) => acc + e),
  }));

  // const onSearch = debounce((value) => {
  //   const arr = tourArray?.filter((item) =>
  //     value
  //       ? item?.nameTour
  //           .toLowerCase()
  //           .trim()
  //           .includes(value.toLowerCase().trim())
  //       : item
  //   );
  //   setSearch(value);
  //   setTours(arr);
  // }, 1000);

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

  // const handleSearch = (selectedKeys, dataIndex) => {
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const columns = [
    {
      title: "NameTour",
      dataIndex: "nameTour",
      key: "nameTour",
      width: "30%",
    },
    {
      title: "Số lượng tour được đặt",
      dataIndex: "numberOder",
      key: "numberOder",
      width: "20%",
    },
    {
      title: "Số lượng khách",
      dataIndex: "numberpeople",
      key: "numberpeople",
      width: "20%",
      // sorter: (a, b) => a.numberpeople.length - b.numberpeople.length,
      // sorter: (a, b) => a?.numberpeople?.localeCompare(b?.numberpeople),
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
            placeholder="Nhập tên tua"
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
          {/* <div
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
          </div> */}
          <ShowDetails show={show} handleDetail={handleDetail} value={value}>
            <div>
              <div>
                <button onClick={() => setShow("none")}>x</button>
                <button>edit</button>
              </div>

              <p>{value.nameTour}</p>
              <p>{value.nameTour}</p>
              <p>{value.nameTour}</p>
            </div>
          </ShowDetails>
        </div>
      </div>
    </>
  );
};

export default TourList;
