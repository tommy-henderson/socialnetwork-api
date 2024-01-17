const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Routes for managing thoughts

// GET all thoughts or POST a new thought
router.route('/').get(getThought).post(createThought);

// GET, PUT, or DELETE a single thought by ID
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Routes for managing reactions on a thought

// POST a new reaction to a thought
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE a reaction from a thought by reaction ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
