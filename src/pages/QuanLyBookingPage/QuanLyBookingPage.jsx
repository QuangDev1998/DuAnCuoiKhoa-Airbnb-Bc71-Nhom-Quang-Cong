import React from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ListBooking from "./ListBooking";
import { fetchListBookingAction } from "../../redux/thunks/quanLyBookingThunks";
import { setListBookingAction } from "../../redux/slices/quanLyBookingSlice";
import { bookingServices } from "../../services/bookingServices";
import { Input } from "antd";
import ModalEditQLBooking from "./ModalEditQLBooking";

export default function QuanLyBookingPage() {
  const dispatch = useDispatch();
  const [valueInput, setvalueInput] = useState("");
  const searchRef = useRef(null);

  //  debounce
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    setvalueInput(value);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      fetchSearchBooking(value);
    }, 1000);
  };
  const fetchSearchBooking = (keyword) => {
    if (keyword === "") {
      dispatch(fetchListBookingAction());
    } else {
      bookingServices
        .searchBooking(keyword)
        .then((result) => {
          dispatch(setListBookingAction(result.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div className="flex justify-around py-5">
        <h1 className="text-2xl font-bold">Quản lý Booking</h1>
        {/* <button
          //   onClick={() => dispatch(setIsModalOpenAction(true))}
          className="py-2 px-3 cursor-pointer text-white rounded-md shadow-md"
          style={{
            backgroundColor: "rgb(254 107 110)",
          }}
        >
          + Thêm booking mới
        </button> */}
      </div>
      <Input
        className="p-2.5 my-3"
        placeholder="Nhập mã người dùng..."
        onChange={handleChangeSearch}
        value={valueInput}
      />
      <ListBooking
        fetchSearchBooking={fetchSearchBooking}
        valueInput={valueInput}
      />
      <ModalEditQLBooking
        fetchSearchBooking={fetchSearchBooking}
        valueInput={valueInput}
      />
    </div>
  );
}
