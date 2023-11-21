import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import MyButton from "../components/UI/button/MyButton";
import Pagination from "../components/pagination/Pagination";
import { usePosts } from "../hooks/usePosts";
import PostService from "../components/API/PostService";
import { useFetching } from "../hooks/useFetching";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import { getPageCount } from "../utils/pages";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () =>{
    setPage(page+1);
  })

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue= "Кол-во элементов на странице"
        options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 25, name: '25'},
            {value: -1, name: 'Показать всё'},
        ]}
      
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Js" />
      <div ref={lastElement} style={{ height: "20px", background: "red" }}></div>
      {isPostsLoading && (
        <div
          
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
