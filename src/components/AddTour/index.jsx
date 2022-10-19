import React from "react";
import { useDispatch /* , useSelector */, useSelector } from "react-redux";
import moment from "moment";

import { addTour, fetchTour } from "../../store/admin/tourSlice";
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

const AddTour = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("fdsfdsfsd");
    dispatch(fetchTour());
  }, [dispatch]);

  const tourArray = useSelector((state) => state.tourReducer.tours);
  console.log("todoArray", tourArray);

  // const value = tourArray.map((item) => ({
  //   nameTour: item.nameTour,
  //   address: item.address,
  //   from: item.from,
  // }));

  const rangeConfig = {
    rules: [
      {
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (fieldsValue) => {
    console.log("value", fieldsValue);

    const { gia1, gia2, gia3 } = fieldsValue;
    const price = { gia1, gia2, gia3 };

    const rangeValue = fieldsValue["range-picker"];

    const dataSubmit = {
      price,
      from: fieldsValue.from,
      "range-picker": {
        startDate: rangeValue[0].format("YYYY-MM-DD"),
        endDate: rangeValue[1].format("YYYY-MM-DD"),
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

        <Form.Item label="gia">
          <Form.Item
            name="gia1"
            label="giá1"
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

          <Form.Item name="gia2" label="giá2">
            <InputNumber
              addonBefore={<UserOutlined />}
              addonAfter="$"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="gia3" label="giá3">
            <InputNumber
              addonBefore={<UserOutlined />}
              addonAfter="$"
              style={{ width: "100%" }}
            />
          </Form.Item>
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

        <Form.Item label="Address">
          <Input.Group compact>
            <Form.Item
              name={["address", "province"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Province is required",
                },
              ]}
            >
              <Select placeholder="Select province">
                <Option value="Trong-nươc">Trong nước</Option>
                <Option value="Thê-gioi">Thế giới</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["address", "street"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Street is required",
                },
              ]}
            >
              <Input
                style={{
                  width: "50%",
                }}
                placeholder="Input street"
              />
            </Form.Item>
          </Input.Group>
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
    </>
  );
};

export default AddTour;
