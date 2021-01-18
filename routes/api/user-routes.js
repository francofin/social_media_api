const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addUser,
    removeFriend,
} = require('../../controllers/user-controller');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendsId').post(addUser).delete(removeFriend);

module.exports = router;