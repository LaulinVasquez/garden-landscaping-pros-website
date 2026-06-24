const express = require('express');
const { renderHome, submitQuote } = require('../controllers/quoteController');

const router = express.Router();

router.get('/', renderHome);
router.post('/quote', submitQuote);

module.exports = router;
