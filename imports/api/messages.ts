import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export interface Message {
  _id?: string;
  userId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

if (Meteor.isServer) {
	Meteor.publish("messages", function() {
		const userId: string = Meteor.userId();
		if(userId) {
			return Messages.find({userId: userId});
		}
		else {
			throw new Meteor.Error("User not found");
		}
	});
}

export const Messages = new Mongo.Collection<Message>('messages');
