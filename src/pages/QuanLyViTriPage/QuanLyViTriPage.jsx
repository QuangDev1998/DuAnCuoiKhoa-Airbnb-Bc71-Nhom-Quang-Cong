import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import ListViTri from "./ListViTri";
import {
  setIsModalOpenAction,
  setListViTriAction,
} from "../../redux/slices/quanLyViTriSlice";
import { viTriServices } from "../../services/viTriServices";
import ModalQLViTri from "./ModalQLViTri";
import ModalEditQLViTri from "./ModalEditQLViTri";
import { fetchListViTriAction } from "../../redux/thunks/quanLyViTriThunks";

export default function QuanLyViTriPage() {
  const [valueInput, setvalueInput] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  //  debounce tính năng search
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    setvalueInput(value);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      fetchSearchViTri(value);
    }, 1000);
  };
  const fetchSearchViTri = (keyword) => {
    // nếu thanh search trống trả về list vị trí mặc định
    if (keyword === "") {
      dispatch(fetchListViTriAction());
    }
    // nếu có gọi api search và set list vị trí theo data trả về
    else {
      viTriServices
        .findViTri(keyword)
        .then((result) => {
          dispatch(setListViTriAction(result.data.content.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="md:flex justify-around py-5">
        <h1 className="text-2xl font-bold">Quản lý vị trí</h1>
        <button
          onClick={() => dispatch(setIsModalOpenAction(true))}
          className="py-2 px-3 cursor-pointer text-white rounded-md shadow-md"
          style={{
            backgroundColor: "rgb(254 107 110)",
          }}
        >
          + Thêm vị trí mới
        </button>
      </div>
      {/* input search */}
      <Input
        className="p-2.5 my-3"
        placeholder="Tìm tên vị trí"
        onChange={handleChangeSearch}
        value={valueInput}
      />
      {/* list vị trí */}
      <ListViTri fetchSearchViTri={fetchSearchViTri} valueInput={valueInput} />
      {/* modal add */}
      <ModalQLViTri
        fetchSearchViTri={fetchSearchViTri}
        valueInput={valueInput}
      />
      {/* modal edit */}
      <ModalEditQLViTri
        fetchSearchViTri={fetchSearchViTri}
        valueInput={valueInput}
      />
    </div>
  );
}
