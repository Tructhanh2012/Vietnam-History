import { Descriptions, Divider, Modal } from "antd";
import { useState } from "react";
import ReactHTMLParser from "html-react-parser";

const EventViewDetail = (props) => {
  const {
    dataViewDetail,
    setDataViewDetail,
    openViewDetail,
    setOpenViewDetail,
  } = props;

  const onOpen = () => {
    setOpenViewDetail(false);
  };
  const onClose = () => {
    setOpenViewDetail(false);
  };
  return (
    <>
      <Modal
        title="Preview bài viết"
        width={"70vw"}
        open={openViewDetail}
        onCancel={onClose}
        footer={null}
      >
        <Divider />
        <Descriptions title="Thông tin Editor:">
          <Descriptions.Item label="Id">
            {dataViewDetail?.editorInfor.id}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.editorInfor.email}
          </Descriptions.Item>
          <Descriptions.Item label="Tên">
            {dataViewDetail?.editorInfor.name}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin bài viết:" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataViewDetail?.articleId}
          </Descriptions.Item>
          <Descriptions.Item label="Tiêu đề">
            {dataViewDetail?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {ReactHTMLParser(dataViewDetail?.content ?? "")}
            {/* {dataViewDetail?.content} */}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default EventViewDetail;
