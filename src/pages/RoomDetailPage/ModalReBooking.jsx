import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalPaymentOpen,
  setIsModalReBookingOpen,
} from "../../redux/slices/bookingSlice";
export default function ModalReBooking() {
  const { isModalReBookingOpen } = useSelector((state) => state.bookingSlice);
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(setIsModalReBookingOpen(false));
    dispatch(setIsModalPaymentOpen(true));
  };
  const handleCancel = () => {
    dispatch(setIsModalReBookingOpen(false));
  };
  return (
    <Modal
      title="Phòng này bạn đã đặt"
      okText="Tiếp tục"
      cancelText="Không"
      open={isModalReBookingOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Bạn có muốn tiếp tục đặt phòng này ?</p>
    </Modal>
  );
}
