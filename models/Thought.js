const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dayjs = require('dayjs');

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    userName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      //date function
      default: Date.now,
      get: timestamp => dayjs(timestamp).format('DD/MM/YYYY')
    },
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
)


const thoughtSchema = new Schema(
  {
    //
    thoughtText: {
      type: String,
      required: true,
      // must be between 1-280 char
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      //date function
      default: Date.now,
      get: timestamp => dayjs(timestamp).format('DD/MM/YYYY')
    },
    userName: 
    {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
thoughtSchema.virtual('reactionCount')
  // Getter
  // this is the user it retreived
  .get(function () {
    return this.reactions.length;
  })


// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;