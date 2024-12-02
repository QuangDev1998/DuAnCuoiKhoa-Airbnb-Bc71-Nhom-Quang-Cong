import { CheckOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListBookedRoom from "./ListBookedRoom";
import {
  setIsModalEditOpenAction,
  setIsModalUpHinhOpenAction,
} from "../../redux/slices/infoUserSlice";
import ModalUpHinh from "./ModalUpHinh";
import { fetchInfoUserAction } from "../../redux/thunks/infoUserThunks";
import ModalEditInfoUser from "./ModalEditInfoUser";

export default function InfoUserPage() {
  const { id: idUser } = useSelector((state) => state.userSlice.loginData.user);
  const { infoUser } = useSelector((state) => state.infoUserSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInfoUserAction(idUser));
  }, []);
  return (
    <div>
      {/* banner */}
      <div
        className="relative -z-10 w-full flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
        <div className="flex justify-center  z-10">
          <h1 className="text-white text-2xl">
            THÔNG TIN NGƯỜI DÙNG{" "}
            <span className="text-primary">{infoUser.name}</span>
          </h1>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-80  "
          style={{
            backgroundImage: "linear-gradient(195deg,#4c4c4c,#191919)",
          }}
        ></div>
      </div>
      {/* info */}
      <div className="flex gap-10 py-5">
        {/* info left */}
        <div
          className="sticky top-0 basis-1/4 p-5 border-solid border rounded-md"
          style={{
            height: "500px",
          }}
        >
          {/* avatar */}
          <div>
            {infoUser.avatar ? (
              <img
                src={infoUser.avatar}
                alt=""
                className="mx-auto h-36 w-36 object-cover rounded-full"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                alt=""
                className="mx-auto h-36 w-36 object-cover rounded-full"
              />
            )}
          </div>
          <div className="w-full flex justify-center">
            <button
              className="py-1 px-2 my-2 border-2 rounded-md"
              onClick={() => {
                dispatch(setIsModalUpHinhOpenAction(true));
              }}
            >
              Cập nhật ảnh
            </button>
          </div>
          <div className="divide-y-2">
            <div>
              <div className="flex justify-start gap-3">
                <img
                  className="w-6"
                  src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png"
                  alt=""
                />
                <h1 className="font-bold text-xl">Xác minh danh tính</h1>
              </div>
              <p className="my-5">
                Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
              </p>
              <button className="mb-5 py-1 px-2 border  rounded-md text-white bg-primary">
                Nhận huy hiệu
              </button>
            </div>
            <div>
              <h1 className="font-bold text-xl">ADMIN ĐÃ XÁC NHẬN</h1>
              <ul>
                <li>
                  <CheckOutlined /> Địa chỉ email
                </li>
                <li>
                  <CheckOutlined /> Số điện thoại
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* info right */}
        <div className="basis-3/4">
          <h1 className="text-xl font-bold">
            Xin chào, tôi là {infoUser.name}
          </h1>
          <p className="text-sm text-gray-500">Bắt đầu tham gia vào 2024</p>
          <button
            className="py-1 px-2 border-2 rounded-md"
            onClick={() => {
              dispatch(setIsModalEditOpenAction(true));
            }}
          >
            Chỉnh sửa hồ sơ
          </button>
          <ListBookedRoom idUser={infoUser.id} />
        </div>
      </div>
      <ModalUpHinh idUser={idUser} />
      <ModalEditInfoUser />
    </div>
  );
}
