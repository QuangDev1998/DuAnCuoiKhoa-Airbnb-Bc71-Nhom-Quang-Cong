import { StarFilled } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalCalendarOpen,
  setSoLuongKhach,
} from "../../redux/slices/bookingSlice";
import dayjs from "dayjs";
import { bookingServices } from "../../services/bookingServices";

export default function InfoRoomRight() {
  const { infoRoom, listComment } = useSelector(
    (state) => state.detailRoomSlice
  );
  const { soLuongKhach, totalDay, ngayDen, ngayDi } = useSelector(
    (state) => state.bookingSlice
  );
  const loginData = useSelector((state) => state.userSlice?.loginData);
  const user = loginData?.user;
  const bookingAction = () => {
    if (!user) {
      return message.warning("Đăng nhập để đặt phòng");
    }
    let body = {
      maPhong: infoRoom.id,
      ngayDen,
      ngayDi,
      soLuongKhach,
      maNguoiDung: user.id,
    };
    bookingServices
      .createBooking(body)
      .then((result) => {
        message.success("Thêm thành công");
      })
      .catch((err) => {
        message.error("Thêm thất bại");
        console.log(err);
      });
  };
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
    let totalKhach = soLuongKhach;
    totalKhach += option;
    if (totalKhach < 1) {
      return message.warning("Phải có tối thiểu 1 khách");
    }
    if (totalKhach > infoRoom.khach) {
      return message.warning("Đã đạt số lượng khách tối đa");
    }
    dispatch(setSoLuongKhach(totalKhach));
  };
  let tienNgay = infoRoom.giaTien * totalDay;
  let tienTruocThue = tienNgay + 8;
  return (
    <div className="basis-1/3 sticky top-0 h-96">
      <div className="p-5 space-y-5 divide-y-2 border rounded-lg shadow-lg">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <span className="font-bold">{infoRoom.giaTien}$</span> / đêm
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
          <div className="border-2 border-black rounded-lg">
            {/* nhận / trả phòng*/}
            <div className="flex items-center justify-between">
              <div
                className="p-3 cursor-pointer grow border-r-2 border-black"
                onClick={() => {
                  dispatch(setIsModalCalendarOpen(true));
                }}
              >
                <h1 className="font-bold">Nhận phòng</h1>
                <p>{dayjs(ngayDen).format("DD/MM/YYYY")}</p>
              </div>
              <div
                className="p-3 cursor-pointer grow"
                onClick={() => {
                  dispatch(setIsModalCalendarOpen(true));
                }}
              >
                <h1 className="font-bold">Trả phòng</h1>
                <p>{dayjs(ngayDi).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            {/* khách */}
            <div className="p-3 border-t-2 border-black">
              <h1 className="font-bold text-center">Khách</h1>
              <div className="flex justify-evenly items-center">
                <button
                  className="w-9 h-9 font-bold hover:opacity-80 duration-300 text-white rounded-full bg-primary flex items-center justify-center"
                  onClick={() => {
                    handleSoKhachChange(-1);
                  }}
                >
                  <div>–</div>
                </button>
                <p>{soLuongKhach}</p>
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

          <div className="flex justify-between">
            <p>
              ${infoRoom.giaTien} X {totalDay} đêm
            </p>
            <p className="font-bold">$ {tienNgay}</p>
          </div>
          <div className="flex justify-between">
            <p>Phí vệ sinh</p>
            <p className="font-bold">$ 8</p>
          </div>
        </div>
        <div className="space-y-5 py-3">
          {/* total before tax */}
          <div className="flex justify-between">
            <p>Tổng cộng trước thuế</p>
            <p className="font-bold">$ {tienTruocThue}</p>
          </div>
          <div>
            <button
              onClick={bookingAction}
              className=" button-primary w-full font-bold "
              style={{
                padding: "12px 0px",
              }}
            >
              Đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}