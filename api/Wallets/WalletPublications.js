import { WalletCollection } from './WalletCollection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('wallets', function publishAllWallets() {
  return WalletCollection.find();
});
