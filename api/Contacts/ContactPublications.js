import { ContactCollection } from './ContactCollection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('allContacts', function publishAllContacts() {
  return ContactCollection.find();
});

Meteor.publish('myContact', function publishContacts() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error('Access Denied');
  }

  const contacts = ContactCollection.find(
    { userId, archived: { $ne: true } },
    {
      fields: {
        createdAt: false,
      },
    }
  );

  return contacts;
});
