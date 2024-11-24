import React, { useRef, useState } from "react";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { Input } from "antd";

import ListUser from "./ListUser";
import {
  fetchListUserAction,
  setIsModalOpenAction,
  setListUserAction,
} from "../../redux/slices/quanLyNguoiDungSlice";
import { useDispatch } from "react-redux";
import ModalQLNguoiDung from "./ModalQLNguoiDung";
import ModalEditQLNguoiDung from "./ModalEditQLNguoiDung";

export default function QuanLyNguoiDungPage() {
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
      fetchSearchUser(value);
    }, 1000);
  };
  const fetchSearchUser = (keyword) => {
    if (keyword === "") {
      dispatch(fetchListUserAction());
    } else {
      nguoiDungServices
        .findUser(keyword)
        .then((result) => {
          dispatch(setListUserAction(result.data.content.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div className="flex justify-around py-5">
        <h1 className="text-2xl font-bold">Quản lý User</h1>
        <button
          onClick={() => dispatch(setIsModalOpenAction(true))}
          className="py-2 px-3 cursor-pointer text-white rounded-md shadow-md"
          style={{
            backgroundColor: "rgb(254 107 110)",
          }}
        >
          + Thêm người dùng mới
        </button>
      </div>
      <Input
        className="p-2.5 my-3"
        placeholder="Tìm tên người dùng"
        onChange={handleChangeSearch}
        value={valueInput}
      />
      <ListUser fetchSearchUser={fetchSearchUser} valueInput={valueInput} />
      <ModalQLNguoiDung
        fetchSearchUser={fetchSearchUser}
        valueInput={valueInput}
      />
      <ModalEditQLNguoiDung
        fetchSearchUser={fetchSearchUser}
        valueInput={valueInput}
      />
    </div>
  );
}
