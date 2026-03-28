const express = require('express');

const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', pageController.sendLoginPage);
router.get('/login', pageController.sendLoginPage);
router.get('/app', pageController.sendAppPage);

module.exports = router;
