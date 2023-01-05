import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { TransactionCollection, TRANSFER_TYPE, ADD_TYPE } from "./TransactionCollection"

Meteor.methods({
    "transaction.insert"({ isTransferring, sourceWalletId, destinationWalletId, amount }) {
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
            amount
        });
    }
})