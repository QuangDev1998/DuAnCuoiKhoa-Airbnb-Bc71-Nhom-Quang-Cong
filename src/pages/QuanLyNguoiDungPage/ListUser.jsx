import React from "react";
import { Table, Avatar, Tag, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { setIsModalEditOpenAction } from "../../redux/slices/quanLyNguoiDungSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  fetchListUserAction,
  fetchUserInfoAction,
} from "../../redux/thunks/quanLyNguoiDungThunks";

export default function ListUser({ fetchSearchUser, valueInput }) {
  const { listUser } = useSelector((state) => state.quanLyNguoiDungSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUserAction());
  }, [dispatch]);
  // Table data
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_, dataObject) => {
        return (
          <div className="flex items-center">
            {dataObject.avatar ? (
              <Avatar
                src={
                  <img src={dataObject.avatar} alt="avatar" className="mr-2" />
                }
              />
            ) : (
              <Avatar icon={<UserOutlined />} className="mr-2" />
            )}

            <p>{dataObject.name}</p>
          </div>
        );
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, dataObject) => {
        return <p className="underline">{dataObject.email}</p>;
      },
    },
    {
      title: "Người dùng ",
      dataIndex: "role",
      key: "role",
      render: (_, dataObject) => {
        if (dataObject.role === "ADMIN") {
          return <Tag color="red">ADMIN</Tag>;
        } else {
          return <Tag color="green">USER</Tag>;
        }
      },
    },
    {
      title: "Thao tác",

      key: "action",
      render: (_, dataObject) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                dispatch(fetchUserInfoAction(dataObject.id))
                  .then((result) => {
                    dispatch(setIsModalEditOpenAction(true));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className=" text-2xl hover:cursor-pointer mr-2"
            />
            <Popconfirm
              title="Xoá người dùng"
              description="Bạn có chắc muốn xóa người dùng?"
              onConfirm={() => confirm(dataObject.id)}
              okText="Có"
              cancelText="Không"
              okButtonProps={{
                danger: "danger",
              }}
            >
              <DeleteOutlined className=" text-2xl hover:cursor-pointer " />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const renderListUser = () => {
    return listUser.map((user) => {
      return {
        key: user.id,
        avatar: user.avatar,
        id: user.id,
        name: user.name,
        birthday: dayjs(user.birthday).format("DD/MM/YYYY"),
        email: user.email,
        role: user.role,
      };
    });
  };
  const handleDeleteUser = (id) => {
    nguoiDungServices
      .deleteUser(id)
      .then((result) => {
        fetchSearchUser(valueInput);
        message.success("Xóa thành công");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xóa thất bại");
      });
  };

  const confirm = (id) => {
    handleDeleteUser(id);
  };
  return <Table dataSource={renderListUser()} columns={columns} />;
}
