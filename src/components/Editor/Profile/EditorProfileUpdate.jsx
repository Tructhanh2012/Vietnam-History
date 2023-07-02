import { Divider, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditorProfileUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);

  // console.log("check props: ", props);
  const onFinish = async (values) => {
    const { userId, username, email, role } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(userId, username, email, role);
    console.log("check updateUser: ", res.responeMessage.responeMessage);

    if (res && res.responeMessage.responeMessage === "UPDATE USER OKE !") {
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
      title="Cập nhật thông tin cá nhân"
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

        <div className="form-container ">
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder={user.userName} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập tên email!" }]}
          >
            <Input placeholder={user.email} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            name="password"
            label="Mật khẩu:"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống mục này!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            name="confirm"
            label="Nhập lại mật khẩu:"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Hãy xác nhận lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Xác nhận mật khẩu chưa đúng!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditorProfileUpdate;
