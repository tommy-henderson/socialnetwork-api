const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Routes for managing users

// GET all users or POST a new user
router.route('/').get(getUser).post(createUser);

// GET, PUT, or DELETE a single user by ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Routes for managing friends of a user

// POST a new friend to a user's friends list
router.route('/:userId/friends/:friendId').post(addFriend);

// DELETE a friend from a user's friends list by friend ID
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
