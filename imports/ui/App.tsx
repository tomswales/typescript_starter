import React, {FC as FunctionalComponent} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Messages, Message} from '/imports/api/messages';
import MessageItem from '/imports/ui/MessageItem';

const App: FunctionalComponent<AppProps> = ({path, userId, messages}) => {
  return <div>
  	<button onClick={handleLogoutClick}>Log out</button>
    <h1>User is logged in</h1>
    <div><strong>Path is:</strong> {path}</div>
   	<div><strong>Logged in user id is:</strong> {userId}</div>
   	<br/>
   	<h2>Messages</h2>
   	{messages.length > 0 
   		? messages.map((message : Message) => {
	   			return <MessageItem key={message._id} message={message}/>
	   		})
   		: <div>No messages found</div>
   	}
  </div>

  function handleLogoutClick(e): void {
  	e.preventDefault();
  	Meteor.logout();
  }
};

// Interface defining app props
interface AppProps {
	path: string;
	userId: string;
	messages: Message[];
}

// Uses Meteor's reactive data system to monitor login status
export default withTracker(({userId, path}): RouteProps => {
	const messagesSubscription = Meteor.subscribe("messages");
	const messages = Messages.find().fetch();
	return {path: path, userId: userId, messages: messages};
})(App);
