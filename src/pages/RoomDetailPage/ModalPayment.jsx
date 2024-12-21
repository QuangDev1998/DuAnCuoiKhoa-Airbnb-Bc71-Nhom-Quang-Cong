import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalPaymentOpen } from "../../redux/slices/bookingSlice";
import { DatePicker, Form, Input, Modal, Radio, Space, Tabs } from "antd";
import dayjs from "dayjs";

export default function ModalPayment({ bookingAction }) {
  const { isModalPaymentOpen, tienTruocThue } = useSelector(
    (state) => state.bookingSlice
  );
  const [value, setValue] = useState("online");
  const [activeTab, setActiveTab] = useState("1");
  const [optionTab1, setOptionTab] = useState("online");
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(setIsModalPaymentOpen(false));
  };
  const handleCancel = () => {
    dispatch(setIsModalPaymentOpen(false));
  };
  const onChange = (key) => {
    setActiveTab(key);
  };
  const onChangeRadio = (e) => {
    setValue(e.target.value);
    setOptionTab(e.target.value);
  };
  const onFinish = (values) => {
    bookingAction();
  };
  const onFinishFailed = (errorInfo) => {};
  const renderContentTab1 = () => {
    return (
      <div>
        <Radio.Group onChange={onChangeRadio} value={value}>
          <Space direction="vertical">
            <Radio value={"online"}>
              <div className="grid grid-cols-1 md:flex justify-center items-center gap-3 text-xl">
                <p>Thanh toán bằng thẻ</p>
                <div>
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                  <i class="fab fa-cc-amazon-pay"></i>
                  <i class="fa fa-credit-card"></i>
                </div>
              </div>
            </Radio>
            <Radio value={"offline"}>
              <div className="grid grid-cols-1 md:flex justify-center items-center gap-3 text-xl">
                <p>Thanh toán bằng tiền mặt</p>
                <div>
                  <i class="fa fa-money-bill"></i>
                </div>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
        <div className="w-full mt-5 ">
          <button
            className="button-primary"
            onClick={() => {
              setActiveTab("2");
            }}
          >
            Tiếp
          </button>
        </div>
      </div>
    );
  };
  const renderContentTab2 = () => {
    if (optionTab1 === "online") {
      return (
        <Form
          name="basic"
          style={{
            maxWidth: "100%",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Số thẻ"
            name="soThe"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Số thẻ không được để trống!",
              },
              {
                required: true,
                message: "Phải là số",
                pattern: new RegExp(/^[0-9]+$/),
              },
            ]}
          >
            <Space>
              <Form.Item
                name="soThe1"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Phải có 4 số",
                    pattern: new RegExp(/^\d{4}$/),
                  },
                  {
                    required: true,
                    message: "Số thẻ không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soThe2"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Phải có 4 số",
                    pattern: new RegExp(/^\d{4}$/),
                  },
                  {
                    required: true,
                    message: "Số thẻ không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soThe3"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Phải có 4 số",
                    pattern: new RegExp(/^\d{4}$/),
                  },
                  {
                    required: true,
                    message: "Số thẻ không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soThe4"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Phải có 4 số",
                    pattern: new RegExp(/^\d{4}$/),
                  },
                  {
                    required: true,
                    message: "Số thẻ không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item
            label="Mã thẻ"
            name="maThe"
            hasFeedback
            wrapperCol={{
              span: 4,
            }}
            rules={[
              {
                required: true,
                message: "Phải có 3 số",
                pattern: new RegExp(/^\d{3}$/),
              },
              {
                required: true,
                message: "Mã thẻ không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn"
            name="HSD"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Ngày hết hạn không được để trống!",
              },
            ]}
          >
            <DatePicker format={"MM/YYYY"} picker="month" minDate={dayjs()} />
          </Form.Item>
          <Form.Item
            label="Tên chủ thẻ"
            name="chuThe"
            rules={[
              {
                required: true,
                message: "Phải là chữ",
                pattern: new RegExp(/^[a-zA-Z]/),
              },
              {
                required: true,
                message: "Tên chủ thẻ không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-between mt-5">
            <button
              className="button-outline-primary"
              onClick={() => {
                setActiveTab("1");
              }}
            >
              Quay lại
            </button>
            <button className="button-primary" type="submit">
              Thanh toán
            </button>
          </div>
        </Form>
      );
    } else {
      return (
        <div>
          <p>
            Số tiền mặt cần trả :{" "}
            <span className="font-bold">{tienTruocThue} $</span>
          </p>
          <div className="flex justify-between mt-5">
            <button
              className="button-outline-primary"
              onClick={() => {
                setActiveTab("1");
              }}
            >
              Quay lại
            </button>
            <button
              className="button-primary"
              onClick={() => {
                bookingAction();
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      );
    }
  };

  const items = [
    {
      key: "1",
      label: "Hình thức",
      children: renderContentTab1(),
    },
    {
      key: "2",
      label: "Thanh toán",
      children: renderContentTab2(),
    },
  ];

  return (
    <Modal
      //   title="Basic Modal"
      open={isModalPaymentOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Tabs
        // defaultActiveKey="1"
        activeKey={activeTab}
        items={items}
        onChange={onChange}
      />
    </Modal>
  );
}
