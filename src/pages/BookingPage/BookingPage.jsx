import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailRoomAction } from "../../redux/thunks/detailRoomThunks";
import {
  CheckCircleOutlined,
  CheckOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
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
      <div className="divide-y-2">
        {/* info */}
        <div className="grid grid-cols-1 lg:flex gap-5 pb-10">
          {/* left */}
          <InfoRoomLeft />
          {/* right */}
          <InfoRoomRight />
        </div>
        {/* comment list */}
        <Comment idRoom={idRoom} />
      </div>
      <ModalCalendar />
    </div>
  );
}
