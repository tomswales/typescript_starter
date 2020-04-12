import React, {FC as FunctionalComponent} from 'react';
import {Messages, Message} from '/imports/api/messages';

const MessageItem: FunctionalComponent<Message> = ({message}) => {

  return <div className="message-item-container">
            <div className="message-from">
              <img src="/images/user_circle.png" className="user-icon"/>
              <h4>From:</h4>
              <p>{message.sender}</p>
            </div>
            <div className="message-content">
              <p><strong>{message.createdAt.toLocaleString()}</strong></p>
              <p>{message.text}</p>
            </div>
        </div>
};


export default MessageItem;
