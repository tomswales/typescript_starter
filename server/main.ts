import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import {Messages, Message} from '/imports/api/messages';

interface User {
  username: string;
  password: string;
}

Meteor.startup(() => {
  
  if(Meteor.users.find().count() === 0) {
    try {
      const newUser: User = {username: "admin", password: "admin123"};
      const result: string = Accounts.createUser(newUser);
      if(result) {
        Messages.insert({userId: result, sender: "Me", text: "My first message", createdAt: new Date()});
        Messages.insert({userId: result, sender: "You", text: "Your reply to my message", createdAt: new Date()});
      }
    } catch (e) {
      console.log(e);
    }
  }
    
});
