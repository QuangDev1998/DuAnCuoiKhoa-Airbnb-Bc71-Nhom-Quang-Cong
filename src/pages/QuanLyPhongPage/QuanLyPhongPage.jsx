import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import ListPhong from "./ListPhong";
import { fetchListPhongAction } from "../../redux/thunks/quanLyPhongThunks";
import { phongServices } from "../../services/phongServices";
import {
  setIsModalOpenAction,
  setListPhongAction,
} from "../../redux/slices/quanLyPhongSlice";
import ModalQLPhong from "./ModalQLPhong";
import ModalEditQLPhong from "./ModalEditQLPhong";

export default function QuanLyPhongPage() {
  const [valueInput, setvalueInput] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  // debounce tính năng search
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    setvalueInput(value);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      fetchSearchPhong(value);
    }, 1000);
  };
  const fetchSearchPhong = (keyword) => {
    // nếu thanh search trống trả về list phòng mặc định
    if (keyword === "") {
      dispatch(fetchListPhongAction());
    }
    // nếu có gọi api search và set list phòng theo data trả về
    else {
      phongServices
        .findPhong(keyword)
        .then((result) => {
          dispatch(setListPhongAction(result.data.content.data));
        })
        .catch((err) => {
          console.err(err);
        });
    }
  };

  return (
    <div>
      <div className="md:flex justify-around py-5">
        <h1 className="text-2xl font-bold">Quản lý phòng</h1>
        <button
          onClick={() => dispatch(setIsModalOpenAction(true))}
          className="py-2 px-3 cursor-pointer text-white rounded-md shadow-md"
          style={{
            backgroundColor: "rgb(254 107 110)",
          }}
        >
          + Thêm phòng mới
        </button>
      </div>
      {/* input search */}
      <Input
        className="p-2.5 my-3"
        placeholder="Tìm tên phòng"
        onChange={handleChangeSearch}
        value={valueInput}
      />
      {/* list phòng */}
      <ListPhong fetchSearchPhong={fetchSearchPhong} valueInput={valueInput} />
      {/* modal add */}
      <ModalQLPhong
        fetchSearchPhong={fetchSearchPhong}
        valueInput={valueInput}
      />
      {/* modal edit */}
      <ModalEditQLPhong
        fetchSearchPhong={fetchSearchPhong}
        valueInput={valueInput}
      />
    </div>
  );
}
