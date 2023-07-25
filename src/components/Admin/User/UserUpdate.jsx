import { Divider, Form, Input, Modal, message, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const UserUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  // console.log("check props: ", props);
  const onFinish = async (values) => {
    const { id, name } = values;
    setIsSubmit(true);
    const res = await axios.put(
      "http://localhost:8084/general/update-profile",
      {
        id,
        name,
      }
    );
    console.log("check updateUser: ", res);

    if (res && res.status === 200) {
      message.success("Cập nhật editor thành công.");
      setOpenModalUpdate(false);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra!",
        description: "Vui lòng thử lại sau",
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <Modal
      title="Cập nhật editor"
      open={openModalUpdate}
      onOk={form.submit}
      onCancel={() => {
        setOpenModalUpdate(false);
        setDataUpdate(null);
      }}
      okText={"Cập nhật"}
      cancelText={"Hủy"}
      confirmLoading={isSubmit}
    >
      <Divider />
      <Form
        form={form}
        name="updateUser"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          hidden
          labelCol={{ span: 24 }}
          label="id"
          name="id"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Id!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Tên:"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Role:"
          name="role"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Email:"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập tên email!" }]}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
