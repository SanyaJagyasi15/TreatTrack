import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.messageHandlers = [];
    this.notifications = [];
  }

  connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log("WebSocket Connected");
      this.stompClient.subscribe("/topic/notifications", (message) => {
        this.notifications.push(message.body);
        this.messageHandlers.forEach((handler) => handler(message.body));
      });
    });
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  getNotifications() {
    return Promise.resolve(this.notifications);
  }

  clearNotifications() {
    this.notifications = [];
  }

  markNotificationsAsRead() {
    this.notifications = [];
    return Promise.resolve();
  }
}

export default new WebSocketService();
