import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalCalendarOpen,
  setNgayDen,
  setNgayDi,
  setTotalDay,
} from "../../redux/slices/bookingSlice";
import { Modal } from "antd";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

export default function ModalCalendar() {
  const { totalDay, isModalCalendarOpen } = useSelector(
    (state) => state.bookingSlice
  );
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(setIsModalCalendarOpen(false));
  };
  const handleCancel = () => {
    dispatch(setIsModalCalendarOpen(false));
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const onchangeDate = (item) => {
    console.log(item);
    setState([item.selection]);
    let { startDate, endDate } = item.selection;
    console.log(startDate);
    dispatch(setNgayDen(startDate));
    dispatch(setNgayDi(endDate));
    let days = Math.round((endDate - startDate) / (1000 * 3600 * 24));
    dispatch(setTotalDay(days));
  };
  return (
    <Modal
      title={`${totalDay} đêm`}
      // title="dem"
      open={isModalCalendarOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width="600px"
      // height="320px"
    >
      <DateRangePicker
        // onChange={(item) => setState([item.selection])}
        onChange={onchangeDate}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        minDate={addDays(new Date(), 0)}
        initialFocusedRange={[0, 0]}
        months={1}
        rangeColors={["rgb(254, 107, 110)"]}
        ranges={state}
        direction="horizontal"
      />
    </Modal>
  );
}
