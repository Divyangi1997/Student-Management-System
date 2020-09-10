const express = require('express');
const router = express.Router();
const isValidUser = require('../config/validUser');

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/register', userController.registerDept);

router.get('/profile', isValidUser.verifyJwtToken, userController.profile);

router.post('/login', userController.authenticate);

module.exports = router;