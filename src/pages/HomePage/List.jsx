import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { viTriServices } from "../../services/viTriServices";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [vitriArr, setVitriArr] = useState([]);
  const navigate = useNavigate();

  // Đối tượng ánh xạ id với slug
  const destinations = {
    1: "ho-chi-minh",
    2: "can-tho",
    3: "nha-trang",
    4: "ha-noi",
    5: "phu-quoc",
    6: "da-nang",
    7: "da-lat",
    8: "phan-thiet",
  };

  // Lấy dữ liệu từ API
  useEffect(() => {
    viTriServices
      .findViTri("", 1, 8)
      .then((res) => {
        if (res.data.content.data.length > 0) {
          setVitriArr(res.data.content.data);
        } else {
          console.error("Không có dữ liệu.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  // Hàm xử lý điều hướng
  // const handleNavigation = (id) => {
  //   if (destinations[id]) {
  //     navigate(`/rooms/${destinations[id]}`);
  //   } else {
  //     navigate("/rooms");
  //   }
  // };
  const handleNavigation = (id) => {
    navigate(`/rooms/${id}`);
  };
  // Render danh sách các vị trí
  const renderVitriList = () => {
    if (vitriArr.length === 0) {
      return (
        <p className="text-center text-gray-500">Không có dữ liệu hiển thị.</p>
      );
    }

    return vitriArr.map((vitri) => (
      <Card
        key={vitri.id}
        hoverable
        onClick={() => handleNavigation(vitri.id)}
        className="flex flex-row items-center gap-0 rounded-lg shadow-md p-1 bg-white cursor-pointer" // Sử dụng gap-0 để loại bỏ khoảng cách không cần thiết
      >
        <div className="flex gap-3">
          {/* Phần ảnh bên trái */}
          <div className="w-16 h-16 flex-shrink-0">
            <img
              className="w-full h-full object-cover rounded-md"
              alt={vitri.tenViTri}
              src={vitri.hinhAnh}
            />
          </div>

          {/* Phần nội dung bên phải */}
          <div className="flex flex-col justify-center">
            <p className=" font-semibold text-gray-900">{vitri.tenViTri}</p>
            <p className=" text-gray-500">{`${vitri.tinhThanh}, ${vitri.quocGia}`}</p>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <div className="container mx-auto py-4">
      {/* Grid với 4 thẻ mỗi hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {renderVitriList()}
      </div>
    </div>
  );
}
