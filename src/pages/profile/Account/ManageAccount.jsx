import { Divider, Modal, Tabs } from "antd";
import { useState } from "react";
import UserInfo from "./UserInfo";
// import ChangePassword from "./ChangePassword";

const items = [
  {
    key: "info",
    label: "Cập nhật thông tin",
    children: <UserInfo />,
  },
  // {
  //   key: "password",
  //   label: "Đổi mật khẩu",
  //   // children: <ChangePassword />,
  // },
];

const ManageAccount = (props) => {
  const { isModelOpen, setIsModelOpen } = props;

  return (
    <Modal
      title="Quản lý tài khoản"
      open={isModelOpen}
      footer={null}
      onCancel={() => setIsModelOpen(false)}
      maskClosable={true}
      width={"60vw"}
    >
      {/* <Tabs items={items}></Tabs> */}
      <Divider />
      <UserInfo />
    </Modal>
  );
};

export default ManageAccount;
