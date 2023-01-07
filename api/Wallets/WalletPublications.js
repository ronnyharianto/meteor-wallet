import { WalletCollection } from './WalletCollection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('wallets', function publishAllWallets() {
  return WalletCollection.find();
});

Meteor.publish('myWallet', function publishMyWallet() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error('Access Denied');
  }

  return WalletCollection.find({ userId });
});
