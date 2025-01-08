import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCommentByIdRoomAction } from "../../redux/thunks/detailRoomThunks";
import { Form, Input, Rate, Select, message } from "antd";
import dayjs from "dayjs";
import { binhLuanServices } from "../../services/binhLuanServices";
import { setListCommentAction } from "../../redux/slices/detailRoomSlice";

export default function Comment({ idRoom }) {
  const { listComment } = useSelector((state) => state.detailRoomSlice);
  const { isBooked } = useSelector((state) => state.bookingSlice);
  const loginData = useSelector((state) => state.userSlice.loginData);
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
      ngayBinhLuan: dayjs(),
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
    if (listComment.length > 0) {
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
                <p className="text-sm text-gray-500">
                  {dayjs(ngayBinhLuan).format("DD-MM-YY hh:mm")}
                </p>
              </div>
            </div>
            <p className="mt-3">{noiDung}</p>
          </div>
        )
      );
    } else {
      return <p>Hiện không có bình luận nào</p>;
    }
  };
  const handleSortListComment = (order, key) => {
    let listCommentClone = [...listComment];
    if (order === "newest" || order === "highest") {
      listCommentClone.sort((a, b) => b[key] - a[key]);
    }
    if (order === "oldest" || order === "lowest") {
      listCommentClone.sort((a, b) => a[key] - b[key]);
    }
    dispatch(setListCommentAction(listCommentClone));
  };
  const handleSelectChange = (value) => {
    if (value === "newest") {
      return handleSortListComment("newest", "id");
    }
    if (value === "oldest") {
      return handleSortListComment("oldest", "id");
    }
    if (value === "highest") {
      return handleSortListComment("highest", "saoBinhLuan");
    }
    if (value === "lowest") {
      return handleSortListComment("lowest", "saoBinhLuan");
    }
  };
  return (
    <div className="py-5 divide-y-2">
      {/* comment */}
      {/* đã đặt phòng mới đc cmt */}
      {isBooked ? (
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
        <div className="mb-5">
          {" "}
          <p className=" text-primary ">
            Bạn chỉ có thể đánh giá sau khi đã trải nghiệm phòng
          </p>{" "}
        </div>
      )}

      {/* list comment */}
      <div className="py-5">
        <h1 className="text-xl font-bold ">Bình luận</h1>
        <Select
          options={[
            {
              value: "newest",
              label: "Mới nhất",
            },
            {
              value: "oldest",
              label: "Cũ nhất",
            },
            {
              value: "highest",
              label: "Cao nhất",
            },
            {
              value: "lowest",
              label: "Thấp nhất",
            },
          ]}
          className="w-28 my-5"
          onChange={handleSelectChange}
          placeholder="Sắp xếp"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-80 overflow-y-scroll">
          {renderListComment()}
        </div>
      </div>
    </div>
  );
}
