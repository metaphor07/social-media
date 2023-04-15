import React, { useContext, useState } from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [q, setQ] = useState("");

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/" className="link" style={{}}>
          <span className="logo">Metasocial</span>
        </NavLink>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setQ(e.target.value)}
          />
          <span
            className="serarchSpan"
            onClick={() => {
              navigate(`/search?q=${q}`);
            }}
          >
            search
          </span>
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLink">Homepage</div>
        <div className="topbarLink">Timeline</div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <NavLink
            to="/messenger"
            className="link"
            style={{ color: "inherit" }}
          >
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
          </NavLink>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ||
              "data:image/jpeg;base64,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"
            }
            alt=""
            className="topbarImg"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
