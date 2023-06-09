const express = require('express');
const router = express.Router();

const { topUsedSentences } = require('./controller');

router.get('/topUsedSentences', topUsedSentences);

module.exports = router;
