import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import {
  TransactionCollection,
  TRANSFER_TYPE,
  ADD_TYPE,
} from './TransactionCollection';
import { WalletRoles } from '../../infra/WalletRoles';

Meteor.methods({
  'transaction.insert'({
    isTransferring,
    sourceWalletId,
    destinationWalletId,
    amount,
  }) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Access Denied');
    }

    // check(isTransferring, Boolean);
    // check(sourceWalletId, String);
    // check(destinationWalletId, String);
    // check(amount, Number);

    // if (!sourceWalletId) { throw new Meteor.Error("Source Wallet is required"); }
    // if (!destinationWalletId && isTransferring) { throw new Meteor.Error("Destination Wallet is required"); }
    // if (!amount || amount <= 0) { throw new Meteor.Error("Amount is required"); }

    // const data = { isTransferring, sourceWalletId, destinationWalletId, amount };
    // const cleanData = transcationSchema.clean(data);
    // transcationSchema.validate(cleanData);

    return TransactionCollection.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationWalletId: isTransferring ? destinationWalletId : null,
      amount,
      createdBy: userId,
    });
  },
  'transaction.remove'(transactionId) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Access Denied');
    }

    if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
      throw new Meteor.Error('Permission Denied');
    }

    check(transactionId, String);

    return TransactionCollection.remove(transactionId);
  },
});
