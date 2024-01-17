const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Define the reaction schema for individual reactions to thoughts
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        // Format the createdAt date using moment.js
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Define the thought schema for representing thoughts and their associated reactions
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // Format the createdAt date using moment.js
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema], // Embed the reaction schema within the thought schema
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Define a virtual property 'reactionCount' to calculate the number of reactions for a thought
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

// Create the Thought model using the thought schema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model for use in other parts of the application
module.exports = Thought;
