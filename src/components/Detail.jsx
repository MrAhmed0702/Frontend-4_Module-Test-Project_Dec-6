import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.items.find((post) => post.id === Number(id))
  );

  if (!post) {
    return <div className="detail-container">Post not found!</div>;
  }

  return (
    <div className="detail-container">
      <h1 className="page-title">Social Media App</h1>
      <div className="detail-header">
        <h2>Details Page For Post With ID {post.id}</h2>
      </div>
      <div className="detail-content">
        <img
          src={`https://picsum.photos/200?random=${post.id}`}
          alt={post.title}
          className="detail-image"
        />
        <div className="detail-info">
          <p>User Id : {post.userId}</p>
          <p>Title : {post.title}</p>
          <p>Body : {post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
