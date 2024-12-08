import { StarFilled } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";

export default function InfoRoomRight() {
  const { infoRoom, listComment } = useSelector(
    (state) => state.detailRoomSlice
  );
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
  return (
    <div className="basis-1/3 sticky top-0 p-3 h-96 border rounded-md shadow-md">
      <div className="flex justify-between">
        <div>
          <span className="font-bold">{infoRoom.giaTien}$</span> / night
        </div>
        <div className="flex gap-2">
          <p className="space-x-3">
            {" "}
            <StarFilled className="text-primary" />
            {calculateRating()}
          </p>
          <a className="underline text-gray-500" href="">
            ({listComment.length}) đánh giá
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
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
        <div className="flex justify-between items-center">
          <button className="w-9 h-9 text-white rounded-full bg-primary flex items-center justify-center">
            -
          </button>
          <p>khách</p>
          <button className="w-9 h-9 text-white rounded-full bg-primary flex items-center justify-center">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
