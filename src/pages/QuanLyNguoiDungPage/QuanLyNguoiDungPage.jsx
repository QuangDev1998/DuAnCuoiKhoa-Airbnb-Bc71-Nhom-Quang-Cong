import React, { useRef, useState } from "react";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { Input } from "antd";
import ListUser from "./ListUser";
import {
  setCurrentPageAction,
  setIsModalOpenAction,
  setListUserAction,
  setTotalRowAction,
} from "../../redux/slices/quanLyNguoiDungSlice";
import { useDispatch } from "react-redux";
import ModalQLNguoiDung from "./ModalQLNguoiDung";
import ModalEditQLNguoiDung from "./ModalEditQLNguoiDung";

export default function QuanLyNguoiDungPage() {
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  //  debounce tính năng search
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    setValueInput(value);
    // nếu đã có input search => xóa setTimeout cũ / tạo setTimeout mới
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      fetchSearchUser(value);
    }, 1000);
  };
  const fetchSearchUser = (value) => {
    nguoiDungServices
      .findUser(1, 10, value)
      .then((result) => {
        dispatch(setListUserAction(result.data.content.data));
        dispatch(setCurrentPageAction(1));
        dispatch(setTotalRowAction(result.data.content.totalRow));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="md:flex justify-around py-5">
        <h1 className="text-2xl font-bold">Quản lý User</h1>
        <button
          onClick={() => dispatch(setIsModalOpenAction(true))}
          className=" button-primary"
          style={{
            backgroundColor: "rgb(254 107 110)",
            padding: "12px 8px",
          }}
        >
          + Thêm người dùng mới
        </button>
      </div>
      {/* input search */}
      <Input
        className="p-2.5 my-3"
        placeholder="Tìm tên người dùng"
        onChange={handleChangeSearch}
        value={valueInput}
      />
      {/* list user */}
      <ListUser valueInput={valueInput} />
      {/* modal add */}
      <ModalQLNguoiDung valueInput={valueInput} />
      {/* modal edit */}
      <ModalEditQLNguoiDung valueInput={valueInput} />
    </div>
  );
}
