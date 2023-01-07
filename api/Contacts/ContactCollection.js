import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import RegEx from '../../infra/RegEx';

export const ContactCollection = new Mongo.Collection('contacts');

const contactSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    regEx: RegEx.Email,
  },
  imageUrl: {
    type: String,
    optional: true,
  },
  walletId: {
    type: String,
    regEx: RegEx.Id,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
  userId: {
    type: String,
  },
});

ContactCollection.attachSchema(contactSchema);
