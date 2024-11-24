import React from "react";
import { Modal, Form, Input, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalEditOpenAction,
  fetchViTriInfoAction,
} from "../../redux/slices/quanLyViTriSlice";
import { viTriServices } from "../../services/viTriServices";

export default function ModalEditQLViTri({ fetchSearchViTri, valueInput }) {
  const { isModalEditOpen } = useSelector((state) => state.quanLyViTriSlice);
  const { viTriInfo } = useSelector((state) => state.quanLyViTriSlice);
  const { token } = useSelector((state) => state.userSlice.loginData);
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(setIsModalEditOpenAction(false));
  };
  const handleOk = (values) => {
    values.hinhAnh = values.hinhAnh[0].originFileObj;
    let formData = new FormData();
    formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
    const valuesClone = { ...values };
    valuesClone.hinhAnh = "";
    viTriServices
      .uploadHinhViTri(formData, values.id, token)
      .then((result) => {
        let viTriData = result.data.content;
        viTriServices
          .editViTri(viTriData.id, viTriData, token)
          .then((result) => {
            dispatch(fetchViTriInfoAction(viTriData.id));
            fetchSearchViTri(valueInput);
            message.success("Cập nhật thành công");
          })
          .catch((err) => {
            console.log("Cập nhật thất bại");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderInitialValues = () => {
    if (viTriInfo) {
      return {
        id: viTriInfo.id,
        tenViTri: viTriInfo.tenViTri,
        tinhThanh: viTriInfo.tinhThanh,
        quocGia: viTriInfo.quocGia,
      };
    }
  };

  return (
    <div>
      <Modal
        closable={false}
        open={isModalEditOpen}
        okText="Cập nhật"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          style: {
            backgroundColor: "rgb(254 107 110)",
          },
        }}
        prop
        onCancel={hideModal}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            initialValues={renderInitialValues()}
            onFinish={(values) => handleOk(values)}
          >
            {dom}
          </Form>
        )}
      >
        <h1 className="my-3 text-2xl text-center">Cập nhật vị trí</h1>
        hinhAnh
        <img src={viTriInfo?.hinhAnh} alt="" className="h-48 w-full" />
        <Form.Item
          label="Thêm hình"
          name="hinhAnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình!",
            },
          ]}
          hasFeedback
        >
          <Upload
            listType="picture"
            maxCount={1}
            accept="image/png, image/jpeg"
          >
            <button
              className="border-2 border-solid py-2 px-3 rounded-md"
              type="button"
            >
              Change
            </button>
          </Upload>
        </Form.Item>
        {/* id */}
        <Form.Item name="id" label="Mã vị trí">
          <Input disabled />
        </Form.Item>
        {/* tenViTri */}
        <Form.Item
          name="tenViTri"
          label="Tên vị trí"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên vị trí!",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        {/* tinhThanh */}
        <Form.Item
          name="tinhThanh"
          label="Tỉnh thành"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tỉnh thành!",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input />
          {/* quocGia */}
        </Form.Item>
        <Form.Item
          name="quocGia"
          label="Quốc gia"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập quốc gia!",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Modal>
    </div>
  );
}
