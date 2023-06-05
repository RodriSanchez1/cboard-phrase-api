const express = require('express');
const router = express.Router();

const { updateCategories } = require('./controller');

router.put('/:email', updateCategories);

module.exports = router;
