import React, { useState } from "react";
import { Input, DatePicker, Select, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

export default function SelectForm() {
  const [selectedLocation, setSelectedLocation] = useState(""); // State lưu vị trí
  const navigate = useNavigate(); // Sử dụng để điều hướng

  // Hàm xử lý nút tìm kiếm
  const handleSearch = () => {
    if (!selectedLocation) {
      // Nếu chưa chọn vị trí, chuyển đến trang /rooms
      navigate("/rooms");
    } else {
      // Nếu đã chọn vị trí, chuyển đến trang có vị trí cần
      navigate(`/rooms?location=${selectedLocation}`);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="container flex items-center border border-gray-300 rounded-full shadow-md py-2 px-4 w-full bg-white">
        {/* Địa điểm */}
        <div className="flex-1 text-center">
          <div className="text-sm font-semibold text-gray-600">Địa điểm</div>
          <Select
            className="w-full text-center mt-1"
            placeholder="Bạn sắp đi đâu?"
            bordered={false}
            onChange={(value) => setSelectedLocation(value)} // Cập nhật state khi chọn
            options={[
              { value: "hanoi", label: "Hà Nội" },
              { value: "danang", label: "Đà Nẵng" },
              { value: "hochiminh", label: "Hồ Chí Minh" },
            ]}
          />
        </div>

        {/* Divider */}
        <div className="h-10 border-r border-gray-300 mx-4"></div>

        {/* Thời gian */}
        <div className="flex-1 text-center">
          <div className="text-sm font-semibold text-gray-600">Thời gian</div>
          <RangePicker className="w-full mt-1 text-center" bordered={false} />
        </div>

        {/* Divider */}
        <div className="h-10 border-r border-gray-300 mx-4"></div>

        {/* Thêm khách */}
        <div className="flex-1 text-center">
          <div className="text-sm font-semibold text-gray-600">Thêm khách</div>
          <Input
            className="w-full mt-1 text-center"
            placeholder="Số khách"
            bordered={false}
          />
        </div>

        {/* Nút tìm kiếm */}
        <div className="ml-4">
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            className="bg-red-500 hover:bg-red-600 border-none"
            onClick={handleSearch} // Xử lý sự kiện nhấn nút tìm kiếm
          />
        </div>
      </div>
    </div>
  );
}
