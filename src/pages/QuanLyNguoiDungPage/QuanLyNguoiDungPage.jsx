import React, { useRef } from "react";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { Input } from "antd";
import ListUser from "./ListUser";
import {
  setCurrentPageAction,
  setIsModalOpenAction,
  setListUserAction,
  setTotalRowAction,
  setValueInputAction,
} from "../../redux/slices/quanLyNguoiDungSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalQLNguoiDung from "./ModalQLNguoiDung";
import ModalEditQLNguoiDung from "./ModalEditQLNguoiDung";
import { fetchListUserAction } from "../../redux/thunks/quanLyNguoiDungThunks";

export default function QuanLyNguoiDungPage() {
  const { currentPage, valueInput } = useSelector(
    (state) => state.quanLyNguoiDungSlice
  );
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  //  debounce tính năng search
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    dispatch(setValueInputAction(value));
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      fetchSearchUser(valueInput);
    }, 1000);
  };
  const fetchSearchUser = (keyword) => {
    // nếu thanh search trống trả về list user mặc định
    if (keyword === "") {
      dispatch(fetchListUserAction({ currentPage, valueInput }));
    }
    // nếu có gọi api search và set list user theo data trả về
    else {
      nguoiDungServices
        .findUser(1, 10, keyword)
        .then((result) => {
          dispatch(setListUserAction(result.data.content.data));
          dispatch(setCurrentPageAction(1));
          dispatch(setTotalRowAction(result.data.content.totalRow));
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
      <ListUser fetchSearchUser={fetchSearchUser} />
      {/* modal add */}
      <ModalQLNguoiDung />
      {/* modal edit */}
      <ModalEditQLNguoiDung />
    </div>
  );
}
