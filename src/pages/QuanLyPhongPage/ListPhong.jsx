import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Popconfirm, Popover, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  fetchListPhongAction,
  fetchPhongInfoAction,
} from "../../redux/thunks/quanLyPhongThunks";
import { fetchListViTriAction } from "../../redux/thunks/quanLyViTriThunks";
import { phongServices } from "../../services/phongServices";
import { setIsModalEditOpenAction } from "../../redux/slices/quanLyPhongSlice";

export default function ListPhong({ fetchSearchPhong, valueInput }) {
  const { token } = useSelector((state) => state.userSlice.loginData);
  const { listPhong } = useSelector((state) => state.quanLyPhongSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPhongAction());
    dispatch(fetchListViTriAction());
  }, [dispatch]);
  // Table data
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (_, dataObject) => {
        return (
          <div className="flex items-center">
            <img
              src={dataObject.hinhAnh}
              alt="avatar"
              className="mr-2 w-36 h-16 object-cover"
            />
            <p>{dataObject.tenPhong}</p>
          </div>
        );
      },
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Thông tin",
      dataIndex: "moTa",
      key: "moTa",
      render: (_, dataObject) => {
        const content = <p>{dataObject.moTa}</p>;
        return (
          <Popover content={content} title="Chi tiết">
            <p className="cursor-pointer underline">Chi tiết</p>
          </Popover>
        );
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
                dispatch(fetchPhongInfoAction(dataObject.id))
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
              title="Xoá phòng"
              description="Bạn có chắc muốn xóa phòng?"
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
  const getTinhThanh = (maViTri) => {
    switch (maViTri) {
      case 1:
        return "Quận 1";
      case 2:
        return "Cái Răng";
      case 3:
        return "Hòn Rùa";
      case 4:
        return "Hoàn Kiếm";
      case 5:
        return "Hòn Tằm";
      case 6:
        return "Hải Châu";
      case 7:
        return "Langbiang";
      case 8:
        return "Mũi Né";
      default:
        return "";
    }
  };
  const renderListPhong = () => {
    return listPhong.map((phong) => {
      return {
        key: phong.id,
        id: phong.id,
        tenPhong: phong.tenPhong,
        moTa: phong.moTa,
        tinhThanh: getTinhThanh(phong.maViTri),
        hinhAnh: phong.hinhAnh,
      };
    });
  };
  const handleDeletePhong = (id) => {
    phongServices
      .deletePhong(id, token)
      .then((result) => {
        fetchSearchPhong(valueInput);
        message.success("Xóa thành công");
      })
      .catch((err) => {
        message.err("Xóa thất bại");
      });
  };
  const confirm = (id) => {
    handleDeletePhong(id);
  };
  return <Table dataSource={renderListPhong()} columns={columns} />;
}
