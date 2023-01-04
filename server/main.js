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

// const currencySchema = new SimpleSchema({
//     balance: {
//         type: Number,
//         min: 0,
//         defaultValue: 0
//     },
//     currency: {
//         type: String,
//         allowedValues: ["USD", "EUR"],
//         defaultValue: "USD"
//     },
// });

const walletSchema = new SimpleSchema({
    // currencies: {
    //     type: Array
    // },
    // "currencies.$": currencySchema,
    balance: {
        type: Number,
        min: 0,
        defaultValue: 0
    },
    currency: {
        type: String,
        allowedValues: ["USD", "EUR"],
        defaultValue: "USD"
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    }
})

Meteor.startup(async () => {
    if (WalletCollection.find().count() == 0) {
        const walletData = {};

        const cleanWalletData = walletSchema.clean(walletData);
        walletSchema.validate(cleanWalletData);
        WalletCollection.insert(cleanWalletData);
    }
});
