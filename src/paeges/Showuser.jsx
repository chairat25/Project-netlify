import React, { useState, useEffect } from "react";
import "./Showuser.css"; // Import CSS file
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Showuser() {
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // State to check if the component should be visible
  const [startScrollPos, setStartScrollPos] = useState(0); // State to store the initial scroll position

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:8000/authorize/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > startScrollPos) {
        setIsVisible(false); // Hide component when scrolling down
      } else {
        setIsVisible(true); // Show component when scrolling back up
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Set the initial scroll position when the component loads
    setStartScrollPos(window.pageYOffset);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startScrollPos]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user data
    setIsVisible(false); // Hide component immediately
  };

  // If the user data is not loaded or user is not available and isVisible is false, return null to hide the component
  if (!isVisible) {
    return null;
  }

  // If the user is not logged in, display the icon
  if (!user) {
    return (
      <div className="show-user-container">
        
      </div>
    );
  }

  // If the user is logged in, display the user information
  return (
    <div className="show-user-container">
      <div className="user-info">
       
        <img src={user.picture} alt="Profile" className="profile-picture" />
        <p className="welcome-text">{user.username}</p>
      </div>
    </div>
  );
}

export default Showuser;
