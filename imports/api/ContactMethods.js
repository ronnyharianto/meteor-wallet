import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { ContactCollection } from "./ContactCollection"
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    "contacts.insert"({ name, email, imageUrl, walletId }) {
        check(name, String);
        check(email, String);
        check(imageUrl, String);
        check(walletId, String);

        if (!name) { throw new Meteor.Error("Name is required"); }
        if (!walletId) { throw new Meteor.Error("Wallet ID is required"); }

        return ContactCollection.insert({ name, email, imageUrl, walletId, createdAt: new Date() });
    },
    "contacts.remove"({ contactId }) {
        check(contactId, String);
        if (!contactId) { throw new Meteor.Error("Deleted data is not found"); }

        return ContactCollection.remove(contactId);
    },
    "contacts.archive"({ contactId }) {
        check(contactId, String);
        ContactCollection.update({ _id: contactId }, { $set: { archived: true } });
    },
    "contacts.read"() {
        useTracker(() => {
            return ContactCollection.find({}, { sort: { createdAt: -1 } }).fetch();
        });
    }
})