import React, { useState } from "react";
import "./editorProfile.scss";
import { Button, Col, Row, Space } from "antd";
import EditorProfileUpdate from "./Profile/EditorProfileUpdate";

const EditorProfile = () => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  return (
    <>
      <div className="editor-container">
        <div className="editor-card js-editor-card ">
          <div className="editor__img">
            <img
              src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg"
              alt="profile card"
            />
          </div>
          <div className="editor-title">@editor</div>
          <Row align="middle">
            <div className="editor-card__cnt js-editor-cnt editor-profile mt-1">
              <div className="username d-flex info">
                <h5>Username: </h5>
                <span className="information">username ne</span>
              </div>
              <div className="email d-flex info ">
                <h5>Email: </h5>
                <span className="information">user@gmail.com</span>
              </div>
            </div>
          </Row>

          <Row>
            <Col span={10} offset={8}>
              <div className="btn-edit">
                <Button
                  onClick={() => {
                    setOpenModalUpdate(true);
                    setDataUpdate(record);
                  }}
                >
                  Thay đổi thông tin
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <EditorProfileUpdate
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
      />
    </>
  );
};

export default EditorProfile;
