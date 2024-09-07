const User = require('../models/User');
const Thought = require('../models/Thought');  // Import the Thought model

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user (the two fields required are username and email)
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
          { _id: req.params.userId }, // Find user by ID
          { $set: req.body }, // Update with the data provided in the request body
          { new: true, runValidators: true } // Return updated data and run validation
        ); 
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err); 
    }
  },


  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete(
          { _id: req.params.userId }, // Find user by ID
          
        ); 
      res.json({ message: 'user deleted'});
    } catch (err) {
      res.status(500).json(err); 
    }
  },

  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet:{friends:req.params.friendId}
        },
        {
          new:true
        }
      )
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err); 
    }
  },


  async deleteFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull:{friends:req.params.friendId}
        },
        {
          new:true
        }
      )
      res.json({message: 'Friend deleted'});
    } catch (err) {
      res.status(500).json(err); 
    }
  },

// get the thougths
async createThought(req, res) {
  try {
    console.log("got to this line in getThoughts")

 
      const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        userName: req.body.userName,
        userId: req.params.userId,  // Associating the thought with the user
      });

  //     // Optionally update the user's thoughts array
  //     await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { thoughts: newThought._id } },
  //       { new: true }
  //     );

  res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // async function addSampleThought() {
  //   try {
  //     const newThought = await Thought.create({
  //       thoughtText: 'This is a sample thought.',
  //       userName: 'SampleUser',
  //     });
  //     console.log('Sample thought added:', newThought);
  //   } catch (error) {
  //     console.error('Error adding sample thought:', error);
  //   }
  // }
  
  // addSampleThought();

};
