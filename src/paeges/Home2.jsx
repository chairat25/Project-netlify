import React from "react";
import { Link } from "react-router-dom";
import "./Home2.css";

function Home2({ isLoggedIn, username, picture, handleLogout }) {
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div className="user-info">
          <img src={picture} alt="User profile" className="avatar" />
          <div>
            <span className="text-xl font-bold">ยินดีต้อนรับ</span>
            <br></br>
            <span className="truncate text-sm font-medium">{username}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>ตัวยึดตำแหน่งเมื่อผู้ใช้ไม่ได้เข้าสู่ระบบ</div> // Placeholder for when user is not logged in
      )}
    </div>
  );
}

export default Home2;
