import { useEffect, useState } from "react";
import { callGetArticle } from "../../services/api";

export default function getPostList() {
  const [postList, setPostList] = useState([]);

  async function getListArticle() {
    const res = await callGetArticle();

    if (res && res?.data) {
      setPostList(res.data);
    }
  }

  useEffect(() => {
    getListArticle();
  }, []);

  return {
    postList: postList.slice(0, 6),
  };
}
