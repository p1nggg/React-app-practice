import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService, { getById } from "../components/API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
const PostidPage = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, comerror] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComment(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <div>
      <h1>Вы открыли страницу поста с ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Коментарии</h1>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comment.map((comm) => (
            <div key={comm.id} style={{marginTop: '15px'}}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostidPage;
