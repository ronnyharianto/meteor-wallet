import { ContactCollection } from './ContactCollection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('allContacts', function publishAllContacts() {
  return ContactCollection.find();
});

Meteor.publish('contacts', function publishContacts() {
  const contacts = ContactCollection.find(
    { archived: { $ne: true } },
    {
      fields: {
        createdAt: false,
      },
    }
  );

  return contacts;
});
