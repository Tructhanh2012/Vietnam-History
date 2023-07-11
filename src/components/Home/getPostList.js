import { useEffect, useState } from "react";
import { callGetArticle } from "../../services/api";

export default function getPostList() {
  const [postList, setPostList] = useState([]);
  const [document, setDocument] = useState([]);

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
    postList: postList.slice(postList.length - 6, postList.length),
    document: postList,
    setPostList,
  };
}
