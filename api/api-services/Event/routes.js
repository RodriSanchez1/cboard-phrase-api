const express = require('express');
const router = express.Router();

const { trackEvent } = require('./controller');

router.post('/:id', trackEvent);

module.exports = router;
