// import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
import '../api/Contacts/ContactCollection';
import '../api/Contacts/ContactMethods';
import '../api/Contacts/ContactPublications';
// import { WalletCollection } from '../api/Wallets/WalletCollection';
import '../api/Wallets/WalletPublications';
import '../api/Transactions/TransactionCollection';
import '../api/Transactions/TransactionMethods';
import '../api/Roles/RoleMethods';
import '../infra/Accounts';
import '../infra/CustomError';
import '../infra/Roles';

// Meteor.startup(async () => {
//   if (WalletCollection.find().count() == 0) {
//     WalletCollection.insert({});
//   }
// });
