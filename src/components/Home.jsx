import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  if (status === 'loading') {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (status === 'failed') {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Social Media App</h1>
      <div className="grid-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => handleCardClick(post.id)}>
            <img
              src={`https://picsum.photos/200?random=${post.id}`}
              alt={post.title}
              className="post-image"
            />
            <div className="post-content">
              <p className="user-id">User ID: {post.userId}</p>
              <h3 className="post-title">
                Title : {post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title}
              </h3>
              <p className="post-body">
                Body : {post.body.length > 50 ? post.body.slice(0, 50) : post.body}
                {post.body.length > 50 && <span className="read-more"> Read More...</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
