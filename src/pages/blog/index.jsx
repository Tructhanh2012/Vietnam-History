import { useState } from "react";
import { useDropzone } from "react-dropzone";

import "./blog.scss";
const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Tác giả 1",
      timestamp: Date.now(),
      title: "Bài viết mẫu 1",
      content: "Nội dung bài viết mẫu 1",
      media: null,
      likes: 0,
      likedBy: [],
      comments: [],
      showCommentInput: false
    },
    {
      id: 2,
      author: "Tác giả 2",
      timestamp: Date.now(),
      title: "Bài viết mẫu 2",
      content: "Nội dung bài viết mẫu 2",
      media: null,
      likes: 0,
      likedBy: [],
      comments: [],
      showCommentInput: false
    }
  ]);

  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [currentAccount] = useState(""); 
  const [comment, setComment] = useState("");
  const [invalidFileType, setInvalidFileType] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) {
      setTitleError(true);
      setContentError(true);
      return;
    }

    if (!title) {
      setTitleError(true);
      return;
    }

    if (!content) {
      setContentError(true);
      return;
    }

    const defaultAuthor = {
      name: "Tác giả tự động",
      avatar: "link_to_avatar_image",
    };

    const newPost = {
      id: Date.now(),
      author: defaultAuthor,
      timestamp: Date.now(),
      title,
      content,
      media: media ? URL.createObjectURL(media) : null,
      likes: 0,
      likedBy: [],
      comments: [],
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
    setMedia(null);
    e.target.reset();
  };


  const getTimeString = (timestamp) => {
    const currentTime = Date.now();
    const diffTime = currentTime - timestamp;
    const minutes = Math.floor(diffTime / 60000);
    return `${minutes} phút trước`;
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (!post.likedBy.includes(currentAccount)) {
          return {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, currentAccount]
          };
        } else {
          return {
            ...post,
            likes: post.likes - 1,
            likedBy: post.likedBy.filter(
              (account) => account !== currentAccount
            )
          };
        }
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedPost = { ...post };
        updatedPost.comments.push(comment);
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
    setComment(""); // Xóa nội dung bình luận
  };
  const handleToggleComment = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          showCommentInput: !post.showCommentInput
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const defaultAuthor = {
    name: "Tác giả",
    avatar: "link_to_avatar_image"
  };
  const handleFileUpload = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileType = file.type.split("/")[0];
      if (fileType === "image" || fileType === "video") {
        setMedia(file);
        setInvalidFileType(false);
      } else {
        setInvalidFileType(true);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: "image/*, video/*",
  });


  const sortedPosts = [...posts].sort((a, b) => {
    const authorA = a.author && typeof a.author === "string" ? a.author : "";
    const authorB = b.author && typeof b.author === "string" ? b.author : "";

    if (authorA !== authorB) {
      return authorA.localeCompare(authorB);
    }

    if (a.timestamp !== b.timestamp) {
      return b.timestamp - a.timestamp;
    }

    return a.title.localeCompare(b.title);
  });
  return (
    <div>
      {/* <h1>Trang Blog</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}

            />
            {titleError && <p className="error-message">Vui lòng nhập tiêu đề.</p>}
          </div>
          <div className="input-container">
            <textarea
              placeholder="Nội dung"
              value={content}
              onChange={(e) => setContent(e.target.value)}

            />
            {contentError && (
              <p className="error-message">Vui lòng nhập nội dung.</p>
            )}
          </div>
          <label {...getRootProps()} className="file-input">
            <input {...getInputProps()} accept="image/*,video/*" className="file-input" />
            {isDragActive ? (
              <p>Kéo và thả tệp tin vào đây</p>
            ) : (
              <p>Nhấn để thêm ảnh hoặc video</p>
            )}
            {invalidFileType && <p className="error-message">Vui lòng chỉ chọn tệp ảnh hoặc video.</p>}
          </label>

          {media && (
            <div className="preview">
              {media.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img src={URL.createObjectURL(media)} alt="Media Preview" />
              ) : media.name.match(/\.(mp4|ogg|webm)$/i) ? (
                <video controls>
                  <source src={URL.createObjectURL(media)} type="video/mp4" />
                </video>
              ) : null}
            </div>
          )}

          <button type="submit">Đăng bài</button>
        </div>
      </form>
      <div>
        {/* <h2>Danh sách bài viết</h2> */}
        {sortedPosts.length > 0 ? (
          <ul className="danh-sach-bai-viet">
            {sortedPosts.map((post) => (
              <li key={post.id}>
                <div className="baiviet">
                  <div>
                    <img
                      src={post.author.avatar || defaultAuthor.avatar}
                      alt="Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%"
                      }}
                    />
                    <span>{post.author.name || defaultAuthor.name}</span>
                  </div>
                  <p>{getTimeString(post.timestamp)}</p>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  {post.media && (
                    <div className="media-container">
                      {post.media.startsWith("blob:") ? (
                        <img src={post.media} alt="Media" />
                      ) : (
                        <video controls>
                          <source src={post.media} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  )}

                  <div className="viewlike">
                  <p>Lượt thích: {post.likes}</p>
                  
                  {post.likedBy.includes(currentAccount) ? (
                    <button onClick={() => handleLike(post.id)}>
                      <span role="img" aria-label="Unlike">
                        👎
                      </span>{" "}
                      Bỏ thích
                    </button>
                  ) : (
                    <button onClick={() => handleLike(post.id)}>
                      <span role="img" aria-label="Like">
                        👍
                      </span>{" "}
                      Thích
                    </button>
                  )}
                  </div>
                  <div className="viewcmt">
                  <p>Số bình luận: {post.comments.length}</p>
                  <button onClick={() => handleToggleComment(post.id)}>
                    {post.showCommentInput ? "Ẩn bình luận" : "Xem bình luận"}
                  </button>
                  </div>
                  {post.showCommentInput && (
                    <div>
                      <h4>Bình luận</h4>
                      <ul>
                        {post.comments.map((comment, index) => (
                          <li key={index}>{comment}</li>
                        ))}
                      </ul>
                      <textarea
                        placeholder="Bình luận"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button onClick={() => handleComment(post.id, comment)}>
                        Gửi bình luận
                      </button>
                    </div>
                  )}
                  
                  
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có bài viết</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
