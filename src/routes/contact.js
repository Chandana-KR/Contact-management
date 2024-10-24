const express = require('express');
const router = express.Router();
const { addContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Ensure all routes are protected

router.post('/', validateContact, addContact); // Add validation middleware here
router.get('/', getContacts);
router.put('/:id', validateContact, updateContact); // Add validation middleware here
router.delete('/:id', deleteContact);

module.exports = router;
