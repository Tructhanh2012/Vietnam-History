import { Divider, Form, Input, Modal } from "antd";
import { useEffect } from "react";

const UserUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm();
  const onFinish = (values) => {};

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
      //   confirmLoading={isSubmit}
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
          name="_id"
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
