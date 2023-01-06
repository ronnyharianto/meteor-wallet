import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletCollection } from '../Wallets/WalletCollection';
import { Meteor } from 'meteor/meteor';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

export const TransactionCollection = new Mongo.Collection('transactions');

TransactionCollection.before.insert(function (userId, transactionDocument) {
  const sourceWallet = WalletCollection.findOne(
    transactionDocument.sourceWalletId
  );
  if (!sourceWallet) {
    throw Meteor.Error('Source wallet not found.');
  }

  if (transactionDocument.type === TRANSFER_TYPE) {
    if (sourceWallet.balance < transactionDocument.amount) {
      throw new Meteor.Error('Insufficient funds.');
    }
  }
});

TransactionCollection.after.insert(function (userId, transactionDocument) {
  if (transactionDocument.type === TRANSFER_TYPE) {
    WalletCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });

    WalletCollection.update(transactionDocument.destinationWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }

  if (transactionDocument.type === ADD_TYPE) {
    WalletCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
});

// class TransactionMongoCollection extends Mongo.Collection {
//     insert(transactionDocument, callback) {
//         // if (transactionDocument.type === TRANSFER_TYPE) {
//         //     const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId);
//         //     if (!sourceWallet) {
//         //         throw new Meteor.Error("Source wallet not found.");
//         //     }

//         //     if (sourceWallet.balance < transactionDocument.amount) {
//         //         throw new Meteor.Error("Insufficient funds.");
//         //     }

//         //     WalletCollection.update(transactionDocument.sourceWalletId, {
//         //         $inc: { balance: -transactionDocument.amount }
//         //     });

//         //     WalletCollection.update(transactionDocument.destinationWalletId, {
//         //         $inc: { balance: transactionDocument.amount }
//         //     });
//         // }

//         // if (transactionDocument.type === ADD_TYPE) {
//         //     const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId);
//         //     if (!sourceWallet) {
//         //         throw Meteor.Error("Source wallet not found.");
//         //     }

//         //     WalletCollection.update(transactionDocument.sourceWalletId, {
//         //         $inc: { balance: transactionDocument.amount }
//         //     });
//         // }

//         return super.insert(transactionDocument, callback);
//     }
// }

// export const TransactionCollection = new TransactionMongoCollection('transactions');

const transcationSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: !this.isTransferring,
  },
  amount: {
    type: SimpleSchema.Integer,
    min: 1,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

TransactionCollection.attachSchema(transcationSchema);
