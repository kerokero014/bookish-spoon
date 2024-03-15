const express = require('express');
const router = express.Router();
const user = require('../controllers/userCont');

// Create a new User
router.post('/', user.createUser);

router.get('/', user.getAllUsers);

router.delete('/:id', user.deleteContact);

router.put('/:id', user.updateUser);

router.get('/:id', user.getUser);

module.exports = router;
