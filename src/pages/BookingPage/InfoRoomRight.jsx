import { StarFilled } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalCalendarOpen } from "../../redux/slices/bookingSlice";

export default function InfoRoomRight() {
  const { infoRoom, listComment } = useSelector(
    (state) => state.detailRoomSlice
  );
  const [soKhach, setSoKhach] = useState(1);
  const dispatch = useDispatch();
  const calculateRating = () => {
    let total = 0;
    listComment.map((cmt) => {
      total += cmt.saoBinhLuan;
    });
    console.log("total", total);
    console.log(listComment.length);
    let num = total / listComment.length;
    return parseFloat(num.toFixed(2));
  };
  const handleSoKhachChange = (option) => {
    let totalKhach = soKhach;
    totalKhach += option;
    if (totalKhach < 1) {
      return message.warning("Phải có tối thiểu 1 khách");
    }
    if (totalKhach > infoRoom.khach) {
      return message.warning("Đã đạt số lượng khách tối đa");
    }
    setSoKhach(totalKhach);
  };
  return (
    <div className="basis-1/3 sticky top-0 p-3 h-96 border rounded-md shadow-md">
      <div className="flex justify-between">
        <div>
          <span className="font-bold">{infoRoom.giaTien}$</span> / night
        </div>
        <div className="flex gap-2">
          <p className="space-x-2">
            {" "}
            <StarFilled className="text-primary" />
            <span className="font-bold">{calculateRating()}</span>
          </p>
          <a className="underline text-gray-500" href="">
            ({listComment.length}) đánh giá
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            dispatch(setIsModalCalendarOpen(true));
          }}
        >
          <h1 className="font-bold">Nhận phòng</h1>
          <p>Time</p>
        </div>
        <div>
          <h1 className="font-bold">Trả phòng</h1>
          <p>Time</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Khách</h1>
        <div className="flex justify-evenly items-center">
          <button
            className="w-9 h-9 font-bold hover:opacity-80 duration-300 text-white rounded-full bg-primary flex items-center justify-center"
            onClick={() => {
              handleSoKhachChange(-1);
            }}
          >
            <div>–</div>
          </button>
          <p>{soKhach} khách</p>
          <button
            className="w-9 h-9 font-bold hover:opacity-80 duration-300 text-white rounded-full bg-primary flex items-center justify-center"
            onClick={() => {
              handleSoKhachChange(1);
            }}
          >
            <div>+</div>
          </button>
        </div>
      </div>
    </div>
  );
}
