const express = require('express');
const router = express.Router();

const { batchGet } = require('./controller');

router.put('/batchGet', batchGet);

module.exports = router;
