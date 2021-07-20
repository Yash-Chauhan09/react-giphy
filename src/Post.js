import React from "react";
import "./Post.css";

const Post = ({ text, imageUrl }) => {
  return (
    <div className="post">
      <img src={imageUrl} alt="post image" className="post__image" />
      <h4 className="post__text">{text}</h4>
    </div>
  );
};

export default Post;
