import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { ContactCollection } from "./ContactCollection"
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    "contacts.insert"({ name, email, imageUrl }) {
        check(name, String);
        check(email, String);
        check(imageUrl, String);
        if (!name) { throw new Meteor.Error("Name is required"); }

        return ContactCollection.insert({ name, email, imageUrl, createdAt: new Date() });
    },
    "contacts.remove"({ contactId }) {
        check(contactId, String);
        if (!contactId) { throw new Meteor.Error("Deleted data is not found"); }

        return ContactCollection.remove(contactId);
    },
    "contacts.read"() {
        useTracker(() => {
            return ContactCollection.find({}, { sort: { createdAt: -1 } }).fetch();
        });
    }
})