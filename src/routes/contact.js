const express = require('express');
const router = express.Router();
const { addContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); 

router.post('/', validateContact, addContact); 
router.get('/', getContacts);
router.put('/:id', validateContact, updateContact); 
router.delete('/:id', deleteContact);

module.exports = router;
