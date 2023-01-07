import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletRoles } from '../../infra/WalletRoles';

Meteor.methods({
  'roles.isAdmin'() {
    const { userId } = this;
    if (!userId) {
      return new Meteor.Error('Access Denied');
    }

    return Roles.userIsInRoles(userId, WalletRoles);
  },
});
