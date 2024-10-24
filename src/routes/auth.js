const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateUser } = require('../middleware/validation');

router.post('/register', validateUser, register); // Add validation middleware here
router.post('/login', validateUser, login); // Add validation middleware here

module.exports = router;
