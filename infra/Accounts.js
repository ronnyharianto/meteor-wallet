import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { RoutePaths } from './RoutePaths';
import { WalletCollection } from '../api/Wallets/WalletCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello,<br/><br/>Reset your password with this link: ${url}`;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

const getEmailFromUser = (user) => {
  if (user.services?.google) {
    return user.services.google.email;
  }

  return user.emails[0].email;
};

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  // console.log('options', options);
  // console.log('customizedUser', customizedUser);

  customizedUser.email = getEmailFromUser(user);
  customizedUser.location = 'Indonesia';

  WalletCollection.insert({ userId: user._id, createdAt: new Date() });

  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
  location: 99,
});

const settings = Meteor.settings || {};
Meteor.startup(() => {
  if (!settings.googleClientId || !settings.googleSecret) {
    throw new Meteor.Error('googleClientId or googleSecret are required.');
  }

  ServiceConfiguration.configurations.upsert(
    {
      service: 'google',
    },
    {
      $set: {
        service: 'google',
        clientId: settings.googleClientId,
        secret: settings.googleSecret,
      },
    }
  );
});
