import React from 'react';

const ChatLog = props => {
  return (
    <div className="chat-log">
      <h4 style={{ textAlign: 'center' }}>Chatroom/GameLog</h4>
      <hr />
      <h6>01:11 Game: Yang knocked door.</h6>
      <h6>01:12 Game: Big DADDY wants to fight Yang!</h6>
      <h6 style={{ color: 'orange' }}>01:14 Oz: I'm not helping.</h6>
      <h6 style={{ color: 'purple' }}>
        01:15 Raymond: I'll help for 4 Treasures.
      </h6>
      <h6>01:17 Game: Graham has joined the battle!</h6>
    </div>
  );
};

export default ChatLog;
