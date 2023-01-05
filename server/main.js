import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import '../imports/api/Contacts/ContactCollection';
import '../imports/api/Contacts/ContactMethods';
import '../imports/api/Contacts/ContactPublications';
import '../imports/api/Wallets/WalletCollection';
import '../imports/api/Wallets/WalletPublications';
import '../imports/api/Transactions/TransactionCollection';
import '../imports/api/Transactions/TransactionMethods';
import { WalletCollection } from '../imports/api/Wallets/WalletCollection';
import "../infra/CustomError"

Meteor.startup(async () => {
    if (WalletCollection.find().count() == 0) {
        WalletCollection.insert({});
    }
});
