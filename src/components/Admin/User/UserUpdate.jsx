import { Divider, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UserUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  // console.log("check props: ", props);
  const onFinish = async (values) => {
    const { userId, userName, email } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(userId, userName, email);
    console.log("check updateUser: ", res);
    if (res && res.data) {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      //await props.fetchUser;
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
      onOk={() => {
        form.submit();
      }}
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
          name="userID"
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
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Role"
          name="roleNames"
          rules={[{ required: true, message: "Vui lòng nhập tên email!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập tên email!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
