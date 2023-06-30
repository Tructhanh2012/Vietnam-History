import React from "react";
import "./editorProfile.scss";

const EditorProfile = () => {
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

          <div className="editor-card__cnt js-editor-cnt "></div>
        </div>
      </div>
      {/* <div className="main-content">
        {/* Page content */}
      {/* <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-8 order-xl-2 mb-5 mt-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="#">
                        <img
                          src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg"
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                    </div>
                  </div>
                  <div className="text">
                    <h4>UserName: Editor</h4>
                    <h4>Email: editor@gmail.com</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
      {/* </div>  */}
      {/* </div>  */}
    </>
  );
};

export default EditorProfile;
