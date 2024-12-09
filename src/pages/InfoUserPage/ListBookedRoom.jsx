import React, { useEffect } from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createListBookedRoomAction,
  createListIdBookingAction,
} from "../../redux/thunks/infoUserThunks";
import { fetchListViTriAction } from "../../redux/thunks/quanLyViTriThunks";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";

export default function ListBookedRoom({ idUser }) {
  const { listBooking, listBookedRoom } = useSelector(
    (state) => state.infoUserSlice
  );
  const { listViTri } = useSelector((state) => state.quanLyViTriSlice);
  // tạo list chứa ID phòng
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(createListIdBookingAction(idUser));
  }, [dispatch, idUser]);
  // từ list ID phòng => list phòng đã đặt
  useEffect(() => {
    dispatch(createListBookedRoomAction(listBooking));
  }, [dispatch, listBooking]);

  useEffect(() => {
    dispatch(fetchListViTriAction());
  }, []);
  // từ maViTri => tinhThanh
  const renderTinhThanh = (id) => {
    const index = listViTri.findIndex((viTri) => viTri.id === id);
    if (index !== -1) {
      return listViTri[index].tinhThanh;
    }
  };

  const renderListBookedRoom = () => {
    return listBookedRoom?.map((room, index) => {
      return (
        <div className="mt-5" key={index}>
          <Card
            hoverable
            onClick={() => {
              navigate(`/room-booking/${room.id}`);
            }}
          >
            <div className="grid grid-cols1 md:grid-cols-2 gap-5">
              <div className="h-48">
                <img
                  src={room.hinhAnh}
                  alt=""
                  className="h-full object-cover rounded-md"
                />
              </div>
              <div className="divide-y-2">
                <div>
                  <h1 className="text-lg font-bold">{room.tenPhong}</h1>
                  <p>
                    <EnvironmentOutlined className="mr-1" />
                    {renderTinhThanh(room.maViTri)}
                  </p>
                </div>
                <div className="mt-2 flex justify-start gap-5 text-gray-500">
                  <ul>
                    <li>{room.khach} khách</li>
                    <li>{room.phongNgu} phòng ngủ</li>
                    <li>{room.giuong} giường</li>
                    <li>{room.phongTam} phòng tắm</li>
                  </ul>
                  <ul>
                    <li>{room.dieuHoa ? "v" : "x"} Điều hòa</li>
                    <li>{room.bep ? "v" : "x"} Bếp</li>
                    <li>{room.hoBoi ? "v" : "x"} Hồ bơi</li>
                    <li>{room.mayGiat ? "v" : "x"} Máy giặt</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <p>
                    <span className="font-bold">$ {room.giaTien}</span> / đêm
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    });
  };
  return (
    <div>
      <h1 className="text-xl font-bold">Phòng đã thuê</h1>
      {renderListBookedRoom()}
    </div>
  );
}
