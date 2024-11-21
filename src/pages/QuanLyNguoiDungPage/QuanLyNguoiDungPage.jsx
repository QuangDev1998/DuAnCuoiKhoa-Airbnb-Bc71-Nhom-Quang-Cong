import React, { useState } from "react";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { Input } from "antd";

import ListUser from "./ListUser";
import {
  fetchListUserAction,
  setListUserAction,
} from "../../redux/slices/quanLyNguoiDungSlice";
import { useDispatch } from "react-redux";

export default function QuanLyNguoiDungPage() {
  const dispatch = useDispatch();
  const [valueInput, setvalueInput] = useState("");

  //  debounce
  let timeout = null;
  const fetchSearchUser = (keyword) => {
    if (keyword === "") {
      dispatch(fetchListUserAction());
    } else {
      nguoiDungServices
        .searchUser(keyword)
        .then((result) => {
          dispatch(setListUserAction(result.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleChangeSearch = (e) => {
    let { value } = e.target;
    console.log("valueInput:", valueInput);
    setvalueInput(value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchSearchUser(value);
    }, 1000);
  };

  return (
    <div>
      <Input
        className="p-2.5"
        placeholder="Tìm tên người dùng"
        onChange={handleChangeSearch}
        value={valueInput}
      />
      <ListUser fetchSearchUser={fetchSearchUser} valueInput={valueInput} />
    </div>
  );
}
