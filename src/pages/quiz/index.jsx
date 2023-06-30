import { Collapse, Timeline, Layout } from "antd";
import "./quizlist.scss";
const { Panel } = Collapse;
// const content = (
//   <Timeline
//     items={[
//       {
//         children: "Create a services site 2015-09-01",
//       },
//       {
//         children: "Solve initial network problems 2015-09-01",
//       },
//       {
//         children: "Technical testing 2015-09-01",
//       },
//       {
//         children: "Network problems being solved 2015-09-01",
//       },
//     ]}
//   />
// );
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
const QuizListPage = () => {
  return (
    <>
      <div className="quizlist-container">
        <div className="quizlist-wrapper">
          <Layout hasSider>
            <div className="first-col">
              <Collapse className="quiz-colapse">
                <Panel
                  size="large"
                  style={{ background: "#E59797", width: "40em" }}
                  header="SỰ HÌNH THÀNH TRẬT TỰ THẾ GIỚI MỚI SAU CHIẾN TRANH THẾ GIỚI THỨ II (1945 -1949)"
                  key="1"
                >
                  {/* <p>
                    Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường
                    quốc
                  </p>
                  <p>
                    Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường
                    quốc
                  </p>
                  <p>
                    Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường
                    quốc
                  </p> */}
                  <Timeline
                    items={[
                      {
                        children:
                          "Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường quốc",
                      },
                      {
                        children:
                          "Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường quốc",
                      },
                      {
                        children:
                          "Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường quốc",
                      },
                      {
                        children:
                          "Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường quốc",
                      },
                      {
                        children:
                          "Hội nghị Ianta (2-1945) và những thỏa thuận của ba cường quốc",
                      },
                    ]}
                  />
                </Panel>
              </Collapse>
              <Collapse>
                <Panel
                  style={{ background: "#E59797", width: "40em" }}
                  header="CHIẾN TRANH THẾ GIỚI THỨ NHẤT (1914 - 1918)"
                  key="3"
                >
                  <Timeline
                    items={[
                      {
                        children: "Nguyên nhân của chiến tranh",
                      },
                      {
                        children: "Diễn biến và kết cục của chiến tranh",
                      },
                    ]}
                  />
                  {/* <p>Diễn biến và kết cục của chiến tranh</p> */}
                </Panel>
              </Collapse>
            </div>
            <div className="second-col">
              <Collapse quiz-colapse>
                <Panel
                  style={{ background: "#E59797", width: "40em" }}
                  header="SỰ HÌNH THÀNH TRẬT TỰ THẾ GIỚI MỚI SAU CHIẾN TRANH THẾ GIỚI THỨ II (1945 -1949)"
                  key="5"
                >
                  <Timeline
                    items={[
                      {
                        children: "Nguyên nhân của chiến tranh",
                      },
                      {
                        children: "Diễn biến và kết cục của chiến tranh",
                      },
                    ]}
                  />
                </Panel>
                <Panel
                  style={{ background: "#E59797", width: "40em" }}
                  header="LIÊN XÔ VÀ CÁC NƯỚC ĐÔNG ÂU (1945 - 1991). LIÊN BANG NGA (1991 - 2000)"
                  key="2"
                >
                  <Timeline
                    items={[
                      {
                        children: "Nguyên nhân của chiến tranh",
                      },
                      {
                        children: "Diễn biến và kết cục của chiến tranh",
                      },
                    ]}
                  />
                </Panel>
              </Collapse>
            </div>
          </Layout>
        </div>
      </div>
    </>
  );
};
export default QuizListPage;
