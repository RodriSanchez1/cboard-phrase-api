const express = require('express');
const router = express.Router();

const { topUsedSenteces } = require('./controller');

router.put('/topUsedSentences', topUsedSenteces);

module.exports = router;
