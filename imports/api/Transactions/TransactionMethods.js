import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { TransactionCollection } from "./TransactionCollection"
import SimpleSchema from "simpl-schema"

const transcationSchema = new SimpleSchema({
    isTransferring: {
        type: Boolean
    },
    sourceWalletId: {
        type: String
    },
    destinationWalletId: {
        type: String,
        optional: !this.isTransferring
    },
    amount: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    }
})

Meteor.methods({
    "transaction.insert"({ isTransferring, sourceWalletId, destinationWalletId, amount }) {
        // check(isTransferring, Boolean);
        // check(sourceWalletId, String);
        // check(destinationWalletId, String);
        // check(amount, Number);

        // if (!sourceWalletId) { throw new Meteor.Error("Source Wallet is required"); }
        // if (!destinationWalletId && isTransferring) { throw new Meteor.Error("Destination Wallet is required"); }
        // if (!amount || amount <= 0) { throw new Meteor.Error("Amount is required"); }

        const data = { isTransferring, sourceWalletId, destinationWalletId, amount };
        const cleanData = transcationSchema.clean(data);
        transcationSchema.validate(cleanData);

        return TransactionCollection.insert({
            type: cleanData.isTransferring ? "TRANSFER" : "ADD",
            sourceWalletId: cleanData.sourceWalletId,
            destinationWalletId: cleanData.isTransferring ? destinationWalletId : null,
            amount: cleanData.amount
        });
    }
})