import React, { useEffect, useState } from "react";
import "./Notification.css";
import WebSocketService from "../Services/WebSocketService";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    WebSocketService.addMessageHandler((message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 5000);
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default Notification;
