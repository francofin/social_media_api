const {User, Thought} = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .sort({createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleThought(req,res) {
        Thought.findOne({_id:req.params.thoughtId})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message:'Could not find Thought'});
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                { $push: {thoughts: dbThoughtData._id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No User with this Id'});
            }
            res.json({message: 'THough created successfully'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }); 

    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No Thought found'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            {_id: req.params.thoughtId}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'Thought Not Found'})
            }

          return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId},
              {$pull: {thoughts: req.params.thoughtId}},
              {new: true}
          );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No User found'})
            }
            res.json({message: 'THought successfully deleted'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $addToSet: {reactions: req.body}}, {runValidators: true, new: true})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No Thought Found'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(err);
        });
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate({_id:req.params.thoughtId}, { $pull: {reactions: {reactionId: req.params.reactionId}}}, {runValidators: true, new:true})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: "No Thought Found"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;