import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import ListViTri from "./ListViTri";
import {
  setIsModalOpenAction,
  fetchListViTriAction,
  setListViTriAction,
} from "../../redux/slices/quanLyViTriSlice";
import { viTriServices } from "../../services/viTriServices";
import ModalQLViTri from "./ModalQLViTri";
import ModalEditQLViTri from "./ModalEditQLViTri";

export default function QuanLyViTriPage() {
  const [valueInput, setvalueInput] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  //  debounce
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
    if (keyword === "") {
      dispatch(fetchListViTriAction());
    } else {
      viTriServices
        .findViTri(keyword)
        .then((result) => {
          dispatch(setListViTriAction(result.data.content.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-around py-5">
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
      <Input
        className="p-2.5 my-3"
        placeholder="Tìm tên vị trí"
        onChange={handleChangeSearch}
        value={valueInput}
      />

      <ListViTri fetchSearchViTri={fetchSearchViTri} valueInput={valueInput} />
      <ModalQLViTri
        fetchSearchViTri={fetchSearchViTri}
        valueInput={valueInput}
      />
      <ModalEditQLViTri
        fetchSearchViTri={fetchSearchViTri}
        valueInput={valueInput}
      />
    </div>
  );
}
