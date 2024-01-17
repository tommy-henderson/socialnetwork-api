const { Schema, model, Types } = require('mongoose');

// Define the user schema for representing user data
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // Ensure username is unique
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Reference the Thought model for thoughts association
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference the User model for friends association
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
    },
    id: false, // Exclude _id field from JSON
  }
);

// Define 'friendCount' to calculate the number of friends for a user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the user schema
const User = model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;