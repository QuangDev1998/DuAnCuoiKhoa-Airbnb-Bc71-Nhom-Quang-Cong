import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailRoomAction } from "../../redux/thunks/detailRoomThunks";
import { CheckOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Image } from "antd";
import InfoRoomLeft from "./InfoRoomLeft";
import InfoRoomRight from "./InfoRoomRight";
import Comment from "./Comment";
import ModalCalendar from "./ModalCalendar";

export default function BookingPage() {
  const { infoRoom } = useSelector((state) => state.detailRoomSlice);
  const dispatch = useDispatch();
  const params = useParams();
  const idRoom = params.id;
  useEffect(() => {
    dispatch(fetchDetailRoomAction(idRoom));
  }, []);
  const renderTienIch = () => {
    let tienIchContent = [];
    const amenitiesMapping = {
      mayGiat: "Máy giặt",
      banLa: "Bàn là",
      tivi: "Tivi",
      dieuHoa: "Điều hòa",
      wifi: "Wifi",
      bep: "Bếp",
      doXe: "Bãi đỗ xe",
      hoBoi: "Hồ bơi",
      baiUi: "Bàn ủi",
    };
    Object.keys(infoRoom).forEach((key) => {
      if (infoRoom[key] && amenitiesMapping[key]) {
        tienIchContent.push(
          <div key={key}>
            <CheckOutlined /> {amenitiesMapping[key]}
          </div>
        );
      }
    });

    return tienIchContent;
  };
  return (
    <div className="py-10 space-y-5">
      <h1 className="text-2xl font-bold">{infoRoom.tenPhong}</h1>
      <div className="flex">
        <p>
          <EnvironmentOutlined />
        </p>
        <a href="">Việt Nam</a>
      </div>
      {/* image */}
      <div className="w-full">
        <Image src={infoRoom.hinhAnh} className="rounded-lg" width="100%" />
      </div>
      <div className="divide-y-2 space-y-5">
        {/* info */}
        <div>
          <div className="grid grid-cols-1 lg:flex gap-5 ">
            {/* left */}
            <InfoRoomLeft />
            {/* right */}
            <InfoRoomRight />
          </div>
          {/* tiện ích đi kèm */}
          <div>
            <h1 className="text-xl font-bold">Các tiện ích đi kèm</h1>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {renderTienIch()}
            </div>
          </div>
        </div>

        {/* comment list */}
        <Comment idRoom={idRoom} />
      </div>
      <ModalCalendar />
    </div>
  );
}
