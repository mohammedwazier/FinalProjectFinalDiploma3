import { EventEmitter } from "events";

class Notification extends EventEmitter {
  constructor() {
    super();
    this.notif = {
      text: [],
      type: "danger",
      icon: "icon-user",
      autoDismiss: 2
    };
  }
  setNotification = data => {
    this.notif.text = data.text;
    this.notif.type = data.type;
    this.notif.icon = data.icon;
    this.notif.autoDismiss = data.duration;

    this.emit("NOTIFICATION");
  };

  getNotification = callback => {
    callback(this.notif);
  };
}

const notification = new Notification();
export default notification;
