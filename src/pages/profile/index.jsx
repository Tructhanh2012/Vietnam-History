import { useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "./profile.scss";
import { FaPencilAlt } from "react-icons/fa";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("saved");
    const [username, setUsername] = useState("John Doe");
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState("/src/pages/profile/pic/avatar.jpg");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    // const [savedArticle, setSavedArticle] = useState(null);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setIsUsernameValid(value.length >= 3 && value.length <= 20);
    };

    const handleAvatarChange = (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
    };

    const changeAccount = () => {
        setIsEditing(!isEditing);
    };

    const saveAccount = () => {
        if (!isUsernameValid) {
            alert("Tên người dùng phải có độ dài từ 3 đến 20 kí tự!");
            return;
        }

        setIsEditing(false);
        // Thực hiện các thao tác lưu tài khoản vào cơ sở dữ liệu hoặc gửi đến máy chủ
        // Ví dụ: gọi API để cập nhật tên người dùng và ảnh đại diện
        console.log("Tên người dùng mới:", username);
        console.log("URL ảnh đại diện mới:", avatar);
    };

    const [savedArticles, setSavedArticles] = useState([]); // Danh sách bài viết đã lưu

    const saveArticle = (title) => {
        // Kiểm tra xem bài viết đã được lưu trữ hay chưa
        const isSaved = savedArticles.find((article) => article.title === title);

        if (isSaved) {
            // Bài viết đã được lưu, xóa nó khỏi danh sách
            const updatedArticles = savedArticles.filter(
                (article) => article.title !== title
            );
            setSavedArticles(updatedArticles);
        } else {
            // Bài viết chưa được lưu, thêm nó vào danh sách
            setSavedArticles([...savedArticles, { title }]);
        }
    };

    return (
        <div>
            <div className="profile-header">
                <div className="avatar-container">
                    <img src={avatar} alt="Avatar" className="avatar" />
                    {isEditing ? (
                        <label htmlFor="avatar-upload" className="avatar-icon">
                            <FaPencilAlt />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    ) : null}
                </div>
                {!isEditing ? (
                    <h3 className="name">{username}</h3>
                ) : (
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Nhập tên mới"
                        className={!isUsernameValid ? "invalid" : ""}
                    />
                )}
                {!isUsernameValid && <div className="error">3 đến 20 kí tự!</div>}
                {isEditing ? (
                    <button onClick={saveAccount}>Lưu tài khoản</button>
                ) : (
                    <button onClick={changeAccount}>Thay đổi tài khoản</button>
                )}
            </div>

            <div className="tabs-container">
                <div
                    className={`tab ${activeTab === "saved" ? "active" : ""}`}
                    onClick={() => handleTabChange("saved")}
                >
                    Bài viết đã lưu
                </div>
                <div
                    className={`tab ${activeTab === "viewed" ? "active" : ""}`}
                    onClick={() => handleTabChange("viewed")}
                >
                    Bài viết đã xem
                </div>
                <div
                    className={`tab ${activeTab === "quizzes" ? "active" : ""}`}
                    onClick={() => handleTabChange("quizzes")}
                >
                    Quiz đã làm
                </div>
            </div>
            <div className="tabnd">
                {activeTab === "saved" && (
                    <div>
                        <div className="article-list">
                            <div className="article-item">
                                <a href="https://example.com">
                                    <img src="/src/pages/profile/pic/phuoclong.png" alt="Article 1" />
                                </a>
                                <h5> <a href="https://example.com"> Chiến dịch Đường 14 - Phước Long năm 1974 - 1975</a></h5>

                                {/* <span>
                    <Link to="/src/Baiviet.jsx"> Đăng ký</Link>
                  </span> */}
                                <p>Chiến dịch đường 14-Phước Long. Một phần của Chiến tranh Việt Nam</p>
                                <button onClick={() => saveArticle("Tiêu đề bài viết 1")}>
                                    {savedArticles.some(
                                        (article) => article.title === "Tiêu đề bài viết 1"
                                    ) ? (
                                        <FaBookmark className="bookmark-icon saved-icon" />
                                    ) : (
                                        <FaRegBookmark className="bookmark-icon" />
                                    )}
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="https://example.com">
                                    <img src="/src/pages/profile/pic/bandong.jpg" alt="Article 1" />
                                </a>
                                <h5> <a href="https://example.com"> Trận Bản Đông năm 1971</a></h5>

                                <p>Trận Bản Đông. Một phần của Chiến tranh Việt Nam. Thời gian: 8 tháng 2 – 20 tháng 3 năm 1971</p>
                                <button onClick={() => saveArticle("Tiêu đề bài viết 2")}>
                                    {savedArticles.some(
                                        (article) => article.title === "Tiêu đề bài viết 2"
                                    ) ? (
                                        <FaBookmark className="bookmark-icon saved-icon" />
                                    ) : (
                                        <FaRegBookmark className="bookmark-icon" />
                                    )}
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="https://example.com">
                                    <img src="/src/pages/profile/pic/viettrung.png" alt="Article 1" />
                                </a>
                                <h5> <a href="https://example.com"> Vấn đề biên giới Việt-Trung thời Mạc</a></h5>

                                <p>Vấn đề biên giới Việt-Trung thời Mạc phản ánh những hoạt động quân sự - ngoại giao giữa nhà Mạc ở Việt Nam với nhà Minh</p>
                                <button onClick={() => saveArticle("Tiêu đề bài viết 3")}>
                                    {savedArticles.some(
                                        (article) => article.title === "Tiêu đề bài viết 3"
                                    ) ? (
                                        <FaBookmark className="bookmark-icon saved-icon" />
                                    ) : (
                                        <FaRegBookmark className="bookmark-icon" />
                                    )}
                                </button>
                            </div>
                            <div className="article-item">
                                <a href="https://example.com">
                                    <img src="/src/pages/profile/pic/phancap.png" alt="Article 1" />
                                </a>
                                <h5> <a href="https://example.com"> Phân cấp hành chính Việt Nam thời quân chủ</a></h5>

                                <p>Phân cấp hành chính thời quân chủ Việt Nam được tính từ khi Việt Nam giành được độc lập sau thời kỳ bắc thuộc đến khi người Pháp xâm lược và chiếm đóng hoàn toàn Việt Nam (938 - 1886)</p>
                                <button onClick={() => saveArticle("Tiêu đề bài viết 4")}>
                                    {savedArticles.some(
                                        (article) => article.title === "Tiêu đề bài viết 4"
                                    ) ? (
                                        <FaBookmark className="bookmark-icon saved-icon" />
                                    ) : (
                                        <FaRegBookmark className="bookmark-icon" />
                                    )}
                                </button>
                            </div>
                            {/* Thêm các mục bài viết khác tại đây */}
                        </div>
                    </div>
                )}
                {activeTab === "viewed" && <div><div>
                    <div className="article-list">
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/lanhtho.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Lãnh thổ Việt Nam qua từng thời kỳ</a></h5>

                            <p>Lãnh thổ Việt Nam qua từng thời kỳ là sự biến đổi không gian sinh tồn của người Việt, thể hiện bởi các triều đại chính thống được công nhận. Nó mang tính chất phức tạp</p>

                        </div>
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/chuviet.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Lịch sử chữ viết Tiếng Việt</a></h5>
                            <p>Tiếng Việt là ngôn ngữ của người Việt và là ngôn ngữ chính thức của Việt Nam. Trong lịch sử Việt Nam đã có ba loại văn tự được dùng để ghi chép tiếng Việt là chữ Hán, chữ Nôm và chữ quốc ngữ. </p>

                        </div>
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/viettrung.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Vấn đề biên giới Việt-Trung thời Mạc</a></h5>
                            <p>Vấn đề biên giới Việt-Trung thời Mạc phản ánh những hoạt động quân sự - ngoại giao giữa nhà Mạc ở Việt Nam với nhà Minh</p>

                        </div>

                    </div>
                </div>
                </div>}
                {activeTab === "quizzes" && <div><div>
                    <div className="article-list">
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/dienbienphu.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Chiến dịch lịch sử Điện Biên Phủ</a></h5>
                            {/* <span>
                    <Link to="/src/Baiviet.jsx"> Đăng ký</Link>
                  </span> */}
                            <p>Điểm:</p>
                            <p>Thời gian làm bài:</p>
                        </div>
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/chuviet.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Lịch sử chữ viết Tiếng Việt</a></h5>
                            <p>Điểm:</p>
                            <p>Thời gian làm bài:</p>
                        </div>
                        <div className="article-item">
                            <a href="https://example.com">
                                <img src="/src/pages/profile/pic/bachdang.png" alt="Article 1" />
                            </a>
                            <h5> <a href="https://example.com">Chiến thắng sông Bạch Đằng 1288</a></h5>
                            <p>Điểm:</p>
                            <p>Thời gian làm bài:</p>
                        </div>

                    </div>
                </div>
                </div>}
            </div>
        </div>
    );
}

export default ProfilePage;