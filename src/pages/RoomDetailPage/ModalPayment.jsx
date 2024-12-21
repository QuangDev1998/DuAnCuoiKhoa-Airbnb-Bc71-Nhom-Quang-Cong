import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalPaymentOpen } from "../../redux/slices/bookingSlice";
import { Input, Modal, Radio, Space, Tabs } from "antd";

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
        <div className="space-y-3">
          {/* số thẻ */}
          <div className="grid grid-cols-1 md:flex items-center gap-3">
            <p>Số thẻ:</p>
            <div className="flex gap-2 items-center">
              <Input value={9999} className="max-w-14" />-
              <Input value={9999} className="max-w-14" />-
              <Input value={9999} className="max-w-14" />-
              <Input value={9999} className="max-w-14" />
            </div>
          </div>
          {/* mã thẻ */}
          <div className="grid grid-cols-1 md:flex items-center gap-3">
            <p>Mã thẻ:</p>
            <div className="flex gap-2 items-center">
              <Input value={999} className="max-w-12" />
            </div>
          </div>
          {/* HSD */}
          <div className="grid grid-cols-1 md:flex items-center gap-3">
            <div>HSD:</div>
            <div className="flex gap-2 items-center">
              <Input value={11} className="max-w-10" /> /
              <Input value={11} className="max-w-10" /> /
              <Input value={2077} className="max-w-14" />
            </div>
          </div>
          {/* chủ thẻ */}
          <div className="grid grid-cols-1 md:flex items-center gap-3">
            <div>Chủ thẻ:</div>
            <div className="flex gap-2">
              <Input value={"Nguyễn Văn A"} className="" />
            </div>
          </div>
          <p>
            Số tiền cần thanh toán :{" "}
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
