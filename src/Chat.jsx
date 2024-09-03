import React, { Component } from "react";
import axios from "axios";
import CreateChat from "./CreateChat";
import PropsAppBar from "./PropsAppBar";
import "./Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      senderId: props.user._id,
      body: "",
      pollingInterval: null,
    };
  }
  componentDidMount() {
    this.getMessages();
    let pollingInterval = setInterval(this.getMessages, 1000);
    this.setState({
      pollingInterval,
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.pollingInterval);
  }
  handleTextArea = (e) => {
    let body = e.target.value;
    this.setState({
      body: body,
    });
  };
  clearTextArea = () => {
    let body = this.state.body;
    this.state.onSearchTermChange(body);
    this.setState({
      body: "",
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      senderId: this.props.user._id,
      body: this.state.body,
    };
    axios
      .post("/api/chat", data)
      .then((res) => {
        this.getMessages();
        this.clearTextArea();
      })
      .catch((err) => {
        console.log("error returned from axios:", err);
      });
  };
  getMessages = () => {
    axios.get("/api/chat").then((res) => {
      this.setState({
        messages: res.data.data,
      });
    });
  };
  render() {
    const userStyle = {
      backgroundColor: "rgb(228, 26, 35)",
      color: "white",
      fontSize: "1em",
      border: "1px solid red",
      borderRadius: "5%",
      width: "70vw",
      height: "1.5em",
      marginLeft: "2em",
      paddingLeft: "1em",
    };
    const otherStyle = {
      backgroundColor: "white",
      color: "black",
      fontSize: "1em",
      border: "1px solid black",
      width: "70vw",
      height: "1.5em",
      marginLeft: "2em",
      paddingLeft: "1em",
    };

    let chatFeed = this.state.messages.map((message, index) => {
      let senderId = message.senderId;
      let userId = this.props.user._id;
      if (senderId === userId) {
        return (
          <p key={index} style={userStyle}>
            {message.body}
          </p>
        );
      } else {
        return (
          <p key={index} style={otherStyle}>
            {message.body}
          </p>
        );
      }
    });
    return (
      <div className="ChatBox">
        <div className="ChatPageNavDiv">
          <PropsAppBar />
          <div className="chat-feed">{chatFeed}</div>
          <div className="chat-input">
            <CreateChat
              user={this.props.user}
              handleSubmit={this.handleSubmit}
              handleTextArea={this.handleTextArea}
              body={this.state.body}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
