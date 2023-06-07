const express = require('express');
const router = express.Router();

const { batchGet } = require('./controller');

router.post('/batchGet', batchGet);

module.exports = router;
