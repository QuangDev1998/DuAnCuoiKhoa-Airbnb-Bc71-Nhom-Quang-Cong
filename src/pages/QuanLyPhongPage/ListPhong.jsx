import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Popconfirm, Popover, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  fetchListPhongAction,
  fetchPhongInfoAction,
} from "../../redux/thunks/quanLyPhongThunks";
import { phongServices } from "../../services/phongServices";
import {
  setCurrentPageAction,
  setIsModalEditOpenAction,
  setListPhongAction,
} from "../../redux/slices/quanLyPhongSlice";
import { viTriServices } from "../../services/viTriServices";
import { setListViTriAction } from "../../redux/slices/quanLyViTriSlice";

export default function ListPhong({ valueInput }) {
  const { token } = useSelector((state) => state.userSlice.loginData);
  const { listPhong, totalRow, currentPage } = useSelector(
    (state) => state.quanLyPhongSlice
  );
  const { listViTri } = useSelector((state) => state.quanLyViTriSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListPhongAction({ currentPage, valueInput }));
    viTriServices
      .getListViTri()
      .then((result) => {
        dispatch(setListViTriAction(result.data.content));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handlePageChange = (pageIndex, pageSize) => {
    // cập nhật lại currentPage và call api search => set list theo page mới
    dispatch(setCurrentPageAction(pageIndex));
    phongServices
      .findPhong(pageIndex, pageSize, valueInput)
      .then((result) => {
        dispatch(setListPhongAction(result.data.content.data));
      })
      .catch((err) => {
        console.err(err);
      });
  };

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
          <div className="md:flex items-center">
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
            {/* nút edit */}
            <EditOutlined
              onClick={() => {
                dispatch(fetchPhongInfoAction(dataObject.id))
                  .then((result) => {
                    dispatch(setIsModalEditOpenAction(true));
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
              className=" text-2xl hover:cursor-pointer mr-2"
            />
            {/* Popconfirm bọc nút xóa => confirm => chạy hàm xóa */}
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

  // từ maViTri => tenViTri
  const renderTinhThanh = (id) => {
    const index = listViTri.findIndex((viTri) => viTri.id === id);
    if (index !== -1) {
      return listViTri[index].tenViTri;
    }
  };
  const renderListPhong = () => {
    return listPhong.map((phong) => {
      return {
        key: phong.id,
        id: phong.id,
        tenPhong: phong.tenPhong,
        moTa: phong.moTa,
        tinhThanh: renderTinhThanh(phong.maViTri),
        hinhAnh: phong.hinhAnh,
      };
    });
  };
  const handleDeletePhong = (id) => {
    phongServices
      .deletePhong(id, token)
      .then((result) => {
        dispatch(fetchListPhongAction({ currentPage, valueInput }));
        message.success("Xóa thành công");
      })
      .catch((err) => {
        console.error(err);
        message.err("Xóa thất bại");
      });
  };
  const confirm = (id) => {
    handleDeletePhong(id);
  };
  return (
    <Table
      dataSource={renderListPhong()}
      columns={columns}
      pagination={{
        total: totalRow, // total để hiện số trang
        defaultCurrent: 1,
        current: currentPage,
        pageSize: 10, // Số dòng mỗi trang
        onChange: handlePageChange,
      }}
    />
  );
}
