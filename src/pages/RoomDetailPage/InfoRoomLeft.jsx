import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function InfoRoomLeft() {
  const { infoRoom } = useSelector((state) => state.detailRoomSlice);

  return (
    <div className="basis-2/3 divide-y-2 space-y-5">
      <div className="">
        <h1 className="text-xl font-bold">
          Toàn bộ căn hộ. Chủ nhà{" "}
          <span className="underline uppercase">nnhatsang</span>{" "}
        </h1>
        <p>
          {infoRoom.khach} Khách - {infoRoom.phongNgu} Phòng ngủ -{" "}
          {infoRoom.giuong} Giường - {infoRoom.phongTam} Phòng tắm
        </p>
      </div>
      {/* 4 quyền lợi */}
      <div className="py-5 space-y-3">
        <div className="flex gap-2">
          <div>
            <i class="fa fa-home"></i>
          </div>
          <div>
            <h1 className="font-bold">Toàn bộ nhà</h1>
            <p className="text-gray-500">
              Bạn sẽ có chung cư cao cấp cho riêng mình.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <i class="fa fa-broom"></i>
          </div>
          <div>
            <h1 className="font-bold">Vệ sinh tăng cường</h1>
            <p className="text-gray-500">
              Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5
              bước của Airbnb.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <i class="fa fa-award"></i>
          </div>
          <div>
            <h1 className="font-bold">Chủ nhà siêu cấp</h1>
            <p className="text-gray-500">
              Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá
              cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời
              cho khách.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <i class="fa fa-stopwatch"></i>
          </div>
          <div>
            <h1 className="font-bold">Miễn phí hủy trong 48 giờ</h1>
            <p className="text-gray-500">
              Bạn sẽ được miễn phí hủy phòng trong 48 giờ.
            </p>
          </div>
        </div>
      </div>
      {/* mô tả */}
      <div className="py-5">
        <p>{infoRoom.moTa}</p>
      </div>
    </div>
  );
}
