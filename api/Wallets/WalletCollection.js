import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const WalletCollection = new Mongo.Collection('Wallets');

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
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ['USD', 'EUR'],
    defaultValue: 'USD',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

WalletCollection.attachSchema(walletSchema);
