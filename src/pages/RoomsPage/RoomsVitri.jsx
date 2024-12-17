import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { phongServices } from "../../services/phongServices";
import SelectForm from "../HomePage/SelectForm";

export default function RoomsVitri() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);

  // Mapping maViTri thành tên địa điểm
  const locationMapping = {
    1: "Hồ Chí Minh",
    2: "Cần Thơ",
    3: "Nha Trang",
    4: "Hà Nội",
    5: "Phú Quốc",
    6: "Đà Nẵng",
    7: "Đà Lạt",
    8: "Phan Thiết",
  };

  useEffect(() => {
    if (id) {
      phongServices
        .locationPhong(id) // Gọi API để lấy danh sách phòng
        .then((response) => {
          setRooms(response.data.content);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu phòng:", err);
        });
    }
  }, [id]);

  return (
    <div>
      <div
        className="relative -z-10 w-full flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-80"
          style={{
            backgroundImage: "linear-gradient(195deg,#4c4c4c,#191919)",
          }}
        ></div>

        {/* Tên tỉnh thành */}
        <h1 className="absolute text-white text-3xl font-bold z-10">
          {locationMapping[id] || "Địa điểm không xác định"}
        </h1>
      </div>
      <SelectForm />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        {/* Cột danh sách phòng */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Chỗ ở tại khu vực bản đồ đã chọn
          </h2>
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex border rounded-lg shadow-md overflow-hidden bg-white"
            >
              {/* Hình ảnh */}
              <img
                src={room.hinhAnh}
                alt={room.tenPhong}
                className="w-48 h-48 object-cover"
              />

              {/* Thông tin phòng */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{room.tenPhong}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {room.khach} khách • {room.phongNgu} phòng ngủ •{" "}
                    {room.giuong} giường • {room.phongTam} phòng tắm
                  </p>
                  <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                    {room.moTa}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold">${room.giaTien} / đêm</p>
                  <p className="text-xs font-medium text-gray-500">
                    {room.wifi ? "WiFi • " : ""}
                    {room.mayGiat ? "Máy giặt • " : ""}
                    {room.hoBoi ? "Hồ bơi" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cột bản đồ */}
        <div>
          <iframe
            title="Google Maps"
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.google.com/maps?q=${
              locationMapping[id] || "Vietnam"
            }&output=embed`}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}