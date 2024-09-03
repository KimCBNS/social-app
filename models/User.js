const { Schema, model } = require('mongoose');

// use validator to check email
const isEmail = require('validator/lib/isEmail');

// Schema to create User model

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],  // Using validator.js's isEmail function (npm install --save validator)
    },
    thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
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
userSchema.virtual('friendCount')
  // Getter
  // this is the user it retreived
  .get(function () {
    return this.friends.length;
  })

 

// Initialize our User model
const User = model('User', userSchema);


module.exports = User;
