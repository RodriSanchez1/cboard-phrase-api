const express = require('express');
const router = express.Router();

const { login, createUser, updateUser } = require('./controller');

router.post('/', createUser);
router.post('/login', login);
router.put('/:id', updateUser);

module.exports = router;
