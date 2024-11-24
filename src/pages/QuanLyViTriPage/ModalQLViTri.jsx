import React from "react";
import { Modal, Form, Input, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpenAction } from "../../redux/slices/quanLyViTriSlice";
import { viTriServices } from "../../services/viTriServices";
import { PlusOutlined } from "@ant-design/icons";

export default function ModalQLViTri({ fetchSearchViTri, valueInput }) {
  const { isModalOpen } = useSelector((state) => state.quanLyViTriSlice);
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
    dispatch(setIsModalOpenAction(false));
  };
  const handleOk = (values) => {
    values.hinhAnh = values.hinhAnh[0].originFileObj;
    let formData = new FormData();
    formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
    const valuesClone = { ...values };
    valuesClone.hinhAnh = "";
    viTriServices
      .addVitri(valuesClone, token)
      .then((result) => {
        viTriServices
          .uploadHinhViTri(formData, result.data.content.id, token)
          .then((result) => {
            fetchSearchViTri(valueInput);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        closable={false}
        open={isModalOpen}
        okText="Thêm"
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
            onFinish={(values) => handleOk(values)}
          >
            {dom}
          </Form>
        )}
      >
        <h1 className="my-3 text-2xl text-center">Thêm vị trí mới</h1>
        {/* hinhAnh */}
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
              style={{
                border: "solid",
                borderWidth: "1px",
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
            </button>
          </Upload>
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
        </Form.Item>
        {/* quocGia */}
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
