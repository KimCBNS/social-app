const User = require("../models/User");
const Thought = require("../models/Thought"); // Import the Thought model

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
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
        { _id: req.params.userId } // Find user by ID
      );
      res.json({ message: "user deleted" });
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
          $addToSet: { friends: req.params.friendId },
        },
        {
          new: true,
        }
      );
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
          $pull: { friends: req.params.friendId },
        },
        {
          new: true,
        }
      );
      res.json({ message: "Friend deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

 
  async createThought(req, res) {
    try {
 
      const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        userName: req.body.userName,
        userId: req.params.userId, // Associating the thought with the user
      });

      console.log(req.params.userId);
      console.log(newThought);
      const users = req.params.userId;
      //now add thought id number his to the user thought array
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 

  async deleteThought(req, res) {
    try {
      // Delete the thought from the Thoughts collection
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
  
      // Remove the thought reference from the User's thoughts array
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: { thoughts: req.params.thoughtId }
        },
        {
          new: true
        }
      );
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughts(req, res) {
    try {
      console.log("Fetching thoughts..."); // Log before fetching
      const thoughts = await Thought.find();
      console.log("Thoughts found:", thoughts); // Log after fetching
      res.json(thoughts);
    } catch (err) {
      console.error("Error fetching thoughts:", err);
      res.status(500).json({ error: 'An error occurred while fetching thoughts' });
    }
  },


  async createReaction(req, res) {
    try {
 
      const newReaction= await Thought.findById(req.params.thoughtId);
      newReaction.reactions.push(req.body)
    
      await newReaction.save()
      res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      // Delete the thought from the Thoughts collection
      const deletedReaction= await Thought.findById(req.params.thoughtId);
  deletedReaction.reactions = deletedReaction.reactions.filter(reaction => !reaction.reactionId.equals(req.params.reactionId))
     await deletedReaction.save();
      res.json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
