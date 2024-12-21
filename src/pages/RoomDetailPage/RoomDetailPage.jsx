import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailRoomAction } from "../../redux/thunks/detailRoomThunks";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Image } from "antd";
import InfoRoomLeft from "./InfoRoomLeft";
import InfoRoomRight from "./InfoRoomRight";
import Comment from "./Comment";
import ModalCalendar from "./ModalCalendar";
// import ModalPayment from "./ModalPayment";

export default function RoomDetailPage() {
  const { infoRoom } = useSelector((state) => state.detailRoomSlice);
  const dispatch = useDispatch();
  const params = useParams();
  const idRoom = params.id;
  const { themeMode } = useSelector((state) => state.darkModeSlice);
  useEffect(() => {
    dispatch(fetchDetailRoomAction(idRoom));
  }, []);
  const renderTienIch = () => {
    let tienIchContent = [];
    // mapping tên và icon cho key
    const tienIchMapping = {
      mayGiat: { label: "Máy giặt", icon: <i class="fa fa-water"></i> },
      banLa: { label: "Bàn là", icon: <i class="fa fa-tshirt"></i> },
      tivi: { label: "Tivi", icon: <i class="fa fa-desktop"></i> },
      dieuHoa: {
        label: "Điều hòa",
        icon: <i class="fa fa-temperature-low"></i>,
      },
      wifi: { label: "Wifi", icon: <i class="fa fa-wifi"></i> },
      bep: { label: "Bếp", icon: <i class="fa fa-utensils"></i> },
      doXe: { label: "Bãi đỗ xe", icon: <i class="fa fa-car-side"></i> },
      hoBoi: { label: "Hồ bơi", icon: <i class="fa fa-swimming-pool"></i> },
      baiUi: { label: "Bàn ủi", icon: <i class="fa fa-water"></i> },
    };
    // loop qua mỗi key nếu khớp => push vào array để render
    Object.keys(infoRoom).forEach((key) => {
      if (infoRoom[key] && tienIchMapping[key]) {
        const { label, icon } = tienIchMapping[key];
        tienIchContent.push(
          <div key={key}>
            {icon} {label}
          </div>
        );
      }
    });

    return tienIchContent;
  };
  return (
    <div className={`${themeMode}`}>
      <div className={`pt-28 space-y-5 container `}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderTienIch()}
              </div>
            </div>
          </div>

          {/* comment list */}
          <Comment idRoom={idRoom} />
        </div>
        <ModalCalendar />
        {/* <ModalPayment /> */}
      </div>
    </div>
  );
}
