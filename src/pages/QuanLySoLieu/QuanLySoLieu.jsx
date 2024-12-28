import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListBinhLuanAction,
  fetchListDatPhongAction,
  fetchListPhongAction,
} from "../../redux/thunks/quanLySoLieuThunks";
import GiaPhong from "./GiaPhong";
import Rating from "./Rating";
import RatingPercentage from "./RatingPercentage";

export default function QuanLySoLieu() {
  const { listPhong } = useSelector((state) => state.quanLySoLieuSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPhongAction());
    dispatch(fetchListBinhLuanAction());
    dispatch(fetchListDatPhongAction());
  }, []);

  return (
    <div>
      <div className="md:grid grid-cols-2 gap-3">
        <RatingPercentage />
        <div>
          <Rating />
          <GiaPhong />
        </div>
      </div>
    </div>
  );
}
