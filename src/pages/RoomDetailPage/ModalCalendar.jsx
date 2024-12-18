import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalCalendarOpen,
  setNgayDen,
  setNgayDi,
  setTotalDay,
} from "../../redux/slices/bookingSlice";
import { Modal } from "antd";
import { DateRange } from "react-date-range";

export default function ModalCalendar() {
  const { totalDay, isModalCalendarOpen, ngayDen, ngayDi } = useSelector(
    (state) => state.bookingSlice
  );
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(setIsModalCalendarOpen(false));
  };
  const handleCancel = () => {
    dispatch(setIsModalCalendarOpen(false));
  };
  const [dateRange, setDateRange] = useState([
    {
      startDate: ngayDen,
      endDate: ngayDi,
      key: "selection",
    },
  ]);
  const onchangeDate = (item) => {
    setDateRange([item.selection]);
    let { startDate, endDate } = item.selection;
    dispatch(setNgayDen(startDate));
    dispatch(setNgayDi(endDate));
    let days = Math.round((endDate - startDate) / (1000 * 3600 * 24));
    dispatch(setTotalDay(days));
  };
  return (
    <Modal
      title={`${totalDay} đêm`}
      open={isModalCalendarOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width="600px"
    >
      <DateRange
        onChange={onchangeDate}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        rangeColors={["rgb(254, 107, 110)"]}
        ranges={dateRange}
        direction="horizontal"
        minDate={new Date()}
      />
    </Modal>
  );
}
