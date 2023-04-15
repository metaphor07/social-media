import React, { useContext, useEffect, useState } from "react";
import Online from "../online/Online";
import "./rightbar.css";
import { Users } from "../../DummyData";
import axios from "axios";
import { DB_API } from "../../Helper";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(
  //   currentUser.followings.includes(user._id)
  // );

  const [isFollowed, setIsFollowed] = useState(false);
  console.log("is followed: ", isFollowed);
  // console.log("check: ", currentUser.followings.includes(user._id));
  useEffect(() => {
    setIsFollowed(currentUser.followings?.includes(user?._id));
  }, [user?._id]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${DB_API}/users/friends/${user._id}`
        );
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const followHandler = async (e) => {
    e.preventDefault();
    try {
      if (isFollowed) {
        await axios.put(`${DB_API}/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setIsFollowed(false);
      } else {
        await axios.put(`${DB_API}/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setIsFollowed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetKuWfzFcIfWnHwEzmk7heTVMhjZsCyGLYA&usqp=CAU"
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Pla Foster</b> and <b>3 other friends</b> have their birthday
            today
          </span>
        </div>

        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="rightbarAd"
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((Cuser) => {
            return <Online key={Cuser.id} user={Cuser} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {isFollowed ? "Unfollow" : "follow"}
            {isFollowed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="profileRightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="profileRightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <NavLink
                to={`/profile/${friend.username}`}
                className="link"
                style={{ color: "inherit" }}
              >
                <div className="rightbarFollowing" key={friend._id}>
                  <img
                    src={
                      friend.profilePicture ||
                      "data:image/jpeg;base64,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"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  );
};

export default Rightbar;
