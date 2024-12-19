import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCommentByIdRoomAction } from "../../redux/thunks/detailRoomThunks";
import { Form, Input, Rate, message } from "antd";
import dayjs from "dayjs";
import { binhLuanServices } from "../../services/binhLuanServices";
import { setIsModalOpen, setModalContent } from "../../redux/slices/userSlice";

export default function Comment({ idRoom }) {
  const { listComment } = useSelector((state) => state.detailRoomSlice);
  const loginData = useSelector((state) => state.userSlice?.loginData);
  const token = loginData?.token;
  const user = loginData?.user;

  const { TextArea } = Input;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListCommentByIdRoomAction(idRoom));
  }, []);
  const onFinish = (values) => {
    let valuesClone = {
      ...values,
      maPhong: idRoom,
      maNguoiBinhLuan: user.id,
      ngayBinhLuan: dayjs().format("DD-MM-YY hh:mm"),
    };
    binhLuanServices
      .addComment(token, valuesClone)
      .then((result) => {
        dispatch(fetchListCommentByIdRoomAction(idRoom));
        message.success("Bình luận thành công");
      })
      .catch((err) => {
        message.error("Bình luận thất bại");
        console.error(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  const renderListComment = () => {
    return listComment.map(
      ({
        id,
        avatar,
        tenNguoiBinhLuan,
        saoBinhLuan,
        ngayBinhLuan,
        noiDung,
      }) => (
        <div key={id}>
          <div className="flex items-center gap-3">
            <div>
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="mx-auto h-12 w-12 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  alt=""
                  className="mx-auto h-12 w-12 object-cover rounded-full"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">{tenNguoiBinhLuan}</h1>
                <Rate
                  disabled
                  defaultValue={saoBinhLuan}
                  className="bg-white"
                />
              </div>
              <p className="text-sm text-gray-500">{ngayBinhLuan}</p>
            </div>
          </div>
          <p className="mt-3">{noiDung}</p>
        </div>
      )
    );
  };
  return (
    <div className="py-5 divide-y-2">
      {/* comment */}
      {user ? (
        <div>
          <div className="flex gap-3 items-center ">
            <div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  alt=""
                  className=" h-12 w-12 object-cover rounded-full"
                />
              )}
            </div>
            <h1 className="text-lg font-bold">{user.name}</h1>
          </div>

          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="saoBinhLuan"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn số sao",
                },
              ]}
            >
              <Rate className="bg-white" />
            </Form.Item>
            <Form.Item
              name="noiDung"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa có nội dung đánh giá!",
                },
              ]}
            >
              <TextArea
                placeholder="Viết bình luận..."
                style={{
                  height: 80,
                }}
              />
            </Form.Item>

            <Form.Item>
              <button className="button-primary" type="submit">
                Đánh giá
              </button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div
          onClick={() => {
            dispatch(setModalContent("login"));
            dispatch(setIsModalOpen(true));
          }}
          className="mb-5"
        >
          {" "}
          <p className="hover:underline text-primary cursor-pointer">
            Đăng nhập để bình luận
          </p>{" "}
        </div>
      )}

      {/* list comment */}
      <div className="py-5">
        <h1 className="text-xl font-bold">Bình luận</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-80 overflow-y-scroll">
          {renderListComment()}
        </div>
      </div>
    </div>
  );
}
