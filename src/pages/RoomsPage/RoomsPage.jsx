import React, { useEffect, useState } from "react";
import { phongServices } from "../../services/phongServices";
import SelectForm from "../HomePage/SelectForm";
import { useNavigate } from "react-router-dom";

export default function RoomsPage() {
  const [phongArr, setPhongArr] = useState([]);
  const navigate = useNavigate();

  // Gọi API lấy danh sách phòng
  useEffect(() => {
    phongServices
      .getListPhong()
      .then((res) => {
        if (res.data.content.length > 0) {
          setPhongArr(res.data.content);
        } else {
          console.error("Không có dữ liệu phòng.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  // Hàm xử lý click
  const handleRoomClick = (id) => {
    navigate(`/room-detail/${id}`);
  };

  return (
    <div>
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
        <div className="flex justify-center z-10">
          <h1 className="text-white text-2xl">Danh Sách Các Phòng Hiện Tại</h1>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-80"
          style={{
            backgroundImage: "linear-gradient(195deg,#4c4c4c,#191919)",
          }}
        ></div>
      </div>
      <SelectForm />
      <div className="container">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Danh sách phòng</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phongArr.map((phong) => (
              <div
                data-aos="zoom-in"
                key={phong.id}
                onClick={() => handleRoomClick(phong.id)} // Thêm onClick
                className="rounded-lg shadow-lg overflow-hidden border flex flex-col duration-300 cursor-pointer hover:shadow-2xl"
              >
                {/* Hình ảnh */}
                <div className="relative">
                  <img
                    src={phong.hinhAnh || "https://via.placeholder.com/300"}
                    alt={phong.tenPhong}
                    className="w-full h-52 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-lg shadow-md">
                    Guest favorite
                  </span>
                </div>

                {/* Nội dung */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="font-semibold text-lg truncate">
                    {phong.tenPhong}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {phong.startDate
                      ? `Ngày ${phong.startDate} - Ngày ${phong.endDate}`
                      : "Ngày không xác định"}
                  </p>
                  <p className="text-black text-base font-semibold mt-3">
                    ${phong.giaTien} / night
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {phong.khach} khách · {phong.phongNgu} phòng ngủ ·{" "}
                    {phong.giuong} giường · {phong.phongTam} phòng tắm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
