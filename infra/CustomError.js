import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
    console.log(`CustomError.js : ${error}`);

    const ddpError = new Meteor.Error(error.message);
    ddpError.error = "validation-error";
    ddpError.details = error.details;
    return ddpError;
});