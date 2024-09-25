import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import "./Navbar.css";
import WebSocketService from "../Services/WebSocketService";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      WebSocketService.getNotifications().then(setNotifications);
    } else {
      WebSocketService.markNotificationsAsRead().then(() => {
        setNotifications([]);
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/viewreceipt">
          SnackTrack
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/viewreceipt">
                Receipts
              </Link>
            </li> */}
          </ul>

          {currentUser ? (
            <div className="d-flex align-items-center">
              <div
                className="notification-bell"
                onClick={handleNotificationClick}
              >
                <i className="fas fa-bell"></i>
                {notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length}
                  </span>
                )}
              </div>
              {showNotifications && (
                <div className="notifications-dropdown">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className="notification-item">
                        {notification}
                      </div>
                    ))
                  ) : (
                    <div className="notification-item">
                      No new notifications
                    </div>
                  )}
                </div>
              )}
              <div className="dropdown">
                <div
                  className="profile-circle"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser.username
                    ? currentUser.username.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  {/* <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li> */}
                  <li>
                    <a className="dropdown-item" href="/" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
