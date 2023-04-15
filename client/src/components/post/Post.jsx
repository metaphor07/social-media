import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./post.css";
import { MoreVert, Send } from "@mui/icons-material";
import { DB_API } from "../../Helper";
// import { format } from "timeago.js";
import * as timeago from "timeago.js";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const [users, setUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id]);
  const likeHandler = async () => {
    try {
      await axios.put(`${DB_API}/posts/${post._id}/like`, { userId: user._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${DB_API}/users?userId=${post.userId}`);

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [post.userId]);

  return (
    <>
      <div className="post">
        <div className={isComment ? "postWrapper tpostWrapper" : "postWrapper"}>
          <div className="postTop">
            <div className="postTopLeft">
              <NavLink to={`/profile/${users.username}`}>
                <img
                  src={
                    users.profilePicture ||
                    "data:image/jpeg;base64,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"
                  }
                  alt=""
                  className="postProfileImg"
                />
              </NavLink>
              <span className="postUsername">{users.username}</span>
              <span className="postDate">{timeago.format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>

          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            {post?.img && <img src={post.img} alt="" className="postImg" />}
            {post?.video && (
              <video
                autoPlay
                controls
                src={post.video}
                alt=""
                className="postImg"
              />
            )}
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="data:image/jpeg;base64,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"
                alt=""
                onClick={likeHandler}
              />
              <img
                className="likeIcon"
                src="https://image.similarpng.com/very-thumbnail/2020/08/Emoji-social-media-Reaction-heart-icon-vector-PNG.png"
                alt=""
                onClick={likeHandler}
              />
              <span className="postLikeCounter">
                {isLiked && "You & "}
                {like} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={() => setIsComment(!isComment)}
              >
                {post.comments?.length} comments
              </span>
            </div>
          </div>

          <hr className="chr" />
          <div className="postComments">
            <div className="commentTop">
              <img
                src={
                  user.profilePicture ||
                  "data:image/jpeg;base64,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"
                }
                alt=""
                className="commentProfileImg"
              />
              <div className="cWrite">
                <input
                  placeholder="write comment here..."
                  className="commentInput"
                />
                <Send className="sendIcon" />
              </div>
            </div>
          </div>
          {isComment && (
            <Comments user={user} post={post} setIsComment={setIsComment} />
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
