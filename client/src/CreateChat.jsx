import React from "react";

const CreateChat = (props) => {
  return (
    <div className="ChatInputBox">
      <h4 className="ChatHeader">CHAT</h4>
      <form className="ChatForm" onSubmit={props.handleSubmit}>
        <textarea
          className="ChatTextBox"
          name="chat-body"
          placeholder="text..."
          onChange={props.handleTextArea}
        />
        <input className="ChatButton" type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default CreateChat;
