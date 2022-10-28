import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { InboxOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";

import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Upload,
  Input,
  DatePicker,
} from "antd";
import { useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { addTour, fetchTour } from "../../store/admin/tourSlice";

import "./style.scss";

const breadcrumbs = [
  { content: "Khóa học", link: "" },
  { content: "Danh sách khóa học", link: "" },
];

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddTour = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTour());
  }, [dispatch]);

  const tourArray = useSelector((state) => state.tourReducer.tours);

  const rangeConfig = {
    rules: [
      {
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];

    const dataSubmit = {
      price: fieldsValue.price,
      from: fieldsValue.from,
      rangePicker: {
        startDate: rangeValue[0].format("DD/MM/YYYY"),
        endDate: rangeValue[1].format("DD/MM/YYYY"),
      },
      nameTour: fieldsValue.nameTour,
      address: fieldsValue.address,
      vehicle: fieldsValue.vehicle,
      number: fieldsValue.number,
      service: fieldsValue.service,
      details: fieldsValue.details,
      promotion: fieldsValue.promotion,
      typeTour: fieldsValue.typeTour,
      quantity: fieldsValue.quantity,
      isNone: false,
      isDisable: false,
      rating: 0,
      userNumberRating: 0,
      numberOder: 0,
      numberpeople: 0,
      longTime:
        (moment(rangeValue[1])._d - moment(rangeValue[0])._d) / 86400000,
    };
    const arr = {
      nameTour: dataSubmit.nameTour,
      address: dataSubmit.address,
      from: dataSubmit.from,
    };

    const value = tourArray.map((item) => ({
      nameTour: item.nameTour,
      address: item.address,
      from: item.from,
    }));

    const isSucceed = value.find(
      (item) => JSON.stringify(item) === JSON.stringify(arr)
    );
    if (isSucceed) {
      console.log("co");
    } else {
      dispatch(addTour(dataSubmit));
    }
  };

  return (
    <>
      <div className="wraper">
        {item ? null : <Breadcrumb breadcrumbs={breadcrumbs} />}
        <div className="form">
          <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
            <Form.Item
              name="nameTour"
              label="tên tour"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input defaultValue="Ant Design love you!" />
            </Form.Item>

            <Form.Item
              name="price"
              label="giá"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                addonBefore={<UserOutlined />}
                addonAfter="$"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="from"
              label="nơi khỏi hành"
              rules={[
                {
                  required: true,
                  message: "ban càn chọn nơi khỏi hành!",
                },
              ]}
            >
              <Select placeholder="Nơi khởi hành">
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="HCM">Hồ Chí Minh</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="address"
              rules={[
                {
                  required: true,
                  message: "address is required",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                placeholder="Input address"
              />
            </Form.Item>

            <Form.Item
              name="vehicle"
              label="phương tiện"
              rules={[
                {
                  required: true,
                  message: "chọn phuong tiên!",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="phuong tien">
                <Option value="oto">ô Tô</Option>
                <Option value="xe-buyt">xe buyt</Option>
                <Option value="máy bay">Máy bay</Option>
              </Select>
            </Form.Item>

            <Form.Item name="number" label="Số lượng khách">
              <InputNumber addonAfter={<UserOutlined />} min={1} max={10} />
            </Form.Item>

            <Form.Item name="quantity" label="Số lượng tour">
              <InputNumber addonAfter={<UserOutlined />} min={1} max={10} />
            </Form.Item>

            <Form.Item name="promotion" label="Khuyến mãi">
              <InputNumber addonAfter={"%"} min={0} max={100} />
            </Form.Item>

            <Form.Item name="service" label="dịch vụ đi kèm">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="F">F</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="typeTour" label="Loại hình du lịch">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="F">F</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
              <RangePicker disabledDate={disabledDate} />
            </Form.Item>

            <Form.Item
              name="details"
              label="Intro"
              rules={[
                {
                  required: true,
                  message: "Please input details",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="longgggggggggggggggggggggggggggggggggg"
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Dragger">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddTour;
