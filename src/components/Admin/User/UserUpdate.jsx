import { Divider, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UserUpdate = (props) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    fetchUser,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  // console.log("check props: ", props);
  const onFinish = async (values) => {
    const { userId, username, email, role } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(userId, username, email, role);
    console.log("check updateUser: ", res.responeMessage.responeMessage);

    if (res && res.responeMessage.responeMessage === "UPDATE USER OKE !") {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
    // setFieldValue;
  }, [dataUpdate]);

  return (
    <Modal
      title="Cập nhật người dùng"
      open={openModalUpdate}
      onOk={form.submit}
      onCancel={() => {
        setOpenModalUpdate(false);
        setDataUpdate(null);
      }}
      onText={"Cập nhật"}
      cancelTe={"Hủy"}
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
          label="Id"
          name="userId"
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
          label="Tên đăng nhập"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Role"
          name="role"
          rules={[{ required: true, message: "Vui lòng nhập tên email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Email"
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
