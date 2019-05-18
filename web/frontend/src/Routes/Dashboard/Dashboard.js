import React, { Component } from "react";
import WebStore from "../../Store/WebStore";

import openSocket from "socket.io-client";
const link =
  process.env.NODE_ENV === "production"
    ? "https://mohammedwazier.ddns.net/"
    : "http://localhost:5000";
const socket = openSocket(link);

export default class Dashboard extends Component {
  componentWillMount() {
    const status = WebStore.checkLocalStorage();
    if (!status) {
      return this.props.history.push("/");
    }
    WebStore.checkUser().then(resp => {
      if (resp.msg === "no_session") {
        //delete socket data (API)
        //push to login page
      }
    });
  }
  render() {
    return <div>dashboard</div>;
  }
}
