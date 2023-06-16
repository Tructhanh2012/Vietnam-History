import { Col, Row, Tabs } from "antd";
import "./profile.scss";
import FakeContent from "./FakeContent";

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: `Bài viết đã xem`,
    children: <FakeContent />,
  },
  {
    key: "2",
    label: `Bài viết đã lưu`,
    children: <></>,
  },
  {
    key: "3",
    label: `Quizz đã làm`,
    children: <></>,
  },
];

const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col md={20} offset={2}>
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              items={items}
              centered
              tabBarGutter={150}
              tabBarStyle={{ marign: 10, fontSize: 30 }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;
