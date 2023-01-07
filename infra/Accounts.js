import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { RoutePaths } from '../ui/RoutePaths';
import { WalletCollection } from '../api/Wallets/WalletCollection';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello,<br/><br/>Reset your password with this link: ${url}`;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  // console.log('options', options);
  // console.log('customizedUser', customizedUser);

  customizedUser.email = customizedUser.emails[0].address;
  customizedUser.location = 'Indonesia';

  WalletCollection.insert({ userId: user._id, createdAt: new Date() });

  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
  location: 99,
});
