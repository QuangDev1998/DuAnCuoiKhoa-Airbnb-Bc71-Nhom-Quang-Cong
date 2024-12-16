import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { SearchOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";
import { viTriServices } from "../../services/viTriServices";

export default function SelectForm() {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [locations, setLocations] = useState([]);
  const [openLocation, setOpenLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    viTriServices
      .findViTri("", 1, 8)
      .then((res) => {
        if (res.data.content.data.length > 0) {
          const filteredData = res.data.content.data.map((item) => ({
            id: item.id,
            hinhAnh: item.hinhAnh,
            tinhThanh: item.tinhThanh,
          }));
          setLocations(filteredData);
        }
      })
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, []);

  const handleSelectLocation = (id) => {
    setSelectedLocationId(id);
    setOpenLocation(false);
  };

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSearch = () => {
    if (selectedLocationId === null) {
      navigate("/rooms");
    } else {
      navigate(`/rooms/${selectedLocationId}`);
    }
  };

  const locationContent = (
    <div className="p-4">
      <p className="font-bold text-lg mb-2">Tìm kiếm địa điểm</p>
      <div className="grid grid-cols-3 gap-4">
        <div
          className={`flex flex-col items-center justify-center cursor-pointer ${
            selectedLocationId === null ? "opacity-50" : ""
          }`}
          onClick={() => handleSelectLocation(null)}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full border border-gray-300">
            <span className="text-gray-500 font-medium">None</span>
          </div>
          <p className="mt-2 text-sm font-medium">None</p>
        </div>

        {locations.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center justify-center cursor-pointer ${
              selectedLocationId === item.id ? "opacity-50" : ""
            }`}
            onClick={() => handleSelectLocation(item.id)}
          >
            <img
              src={item.hinhAnh}
              alt={item.tinhThanh}
              className="w-16 h-16 object-cover rounded-md shadow-sm"
            />
            <p className="mt-2 text-sm font-medium">{item.tinhThanh}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const guestContent = (
    <div className="flex items-center justify-between w-40 p-2">
      <p className="text-gray-800 font-medium">Khách</p>
      <div className="flex items-center gap-2">
        <Button
          shape="circle"
          icon={<MinusOutlined />}
          size="small"
          disabled={guestCount <= 1}
          onClick={() => setGuestCount(guestCount - 1)}
        />
        <span className="font-semibold">{guestCount}</span>
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => setGuestCount(guestCount + 1)}
        />
      </div>
    </div>
  );

  const dateContent = (
    <div className="p-4">
      <DateRangePicker
        ranges={dateRange}
        onChange={handleDateChange}
        months={2}
        direction="horizontal"
        minDate={new Date()}
        rangeColors={["rgb(254, 107, 110)"]}
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center my-20">
      {" "}
      {/* Thêm my-10 để tạo khoảng cách trên và dưới */}
      <div className="container w-full bg-white border rounded-full shadow-sm py-2 px-4 grid grid-cols-3 items-center relative">
        {/* Địa điểm */}
        <Popover
          content={locationContent}
          trigger="click"
          placement="bottom"
          open={openLocation}
          onOpenChange={(visible) => setOpenLocation(visible)}
        >
          <div className="text-center cursor-pointer">
            <p className="text-sm font-semibold text-gray-600 mb-1">Địa điểm</p>
            <span className="text-gray-800">
              {selectedLocationId === null
                ? "Chọn địa điểm"
                : locations.find((loc) => loc.id === selectedLocationId)
                    ?.tinhThanh || "Chọn địa điểm"}
            </span>
          </div>
        </Popover>

        {/* Thời gian */}
        <Popover content={dateContent} trigger="click" placement="bottom">
          <div className="text-center border-l border-r px-4 cursor-pointer">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Thời gian
            </p>
            <span className="text-gray-800">
              {dayjs(dateRange[0].startDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(dateRange[0].endDate).format("DD/MM/YYYY")}
            </span>
          </div>
        </Popover>

        {/* Thêm khách */}
        <Popover content={guestContent} trigger="click" placement="bottom">
          <div className="text-center cursor-pointer">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Thêm khách
            </p>
            <span className="text-gray-800">{guestCount} khách</span>
          </div>
        </Popover>

        {/* Nút tìm kiếm */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            className="bg-red-500 hover:bg-red-600"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
