// Adding a new contact
exports.addContact = async (req, res) => {
    const { name, email, phoneNumber, address, timezone } = req.body;

    const contact = await Contact.create({
        userId: req.user.id, // assuming you're using middleware to extract user from JWT
        name,
        email,
        phoneNumber,
        address,
        timezone,
    });

    res.status(201).json(contact);
};

// Retrieving contacts
exports.getContacts = async (req, res) => {
    const filters = {};
    if (req.query.name) filters.name = req.query.name;
    if (req.query.email) filters.email = req.query.email;
    if (req.query.timezone) filters.timezone = req.query.timezone;

    const contacts = await Contact.findAll({ where: { ...filters, isDeleted: false } });
    res.json(contacts);
};

// Updating a contact
exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, address, timezone } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact || contact.isDeleted) return res.status(404).json({ message: 'Contact not found' });

    contact.name = name;
    contact.email = email;
    contact.phoneNumber = phoneNumber;
    contact.address = address;
    contact.timezone = timezone;
    await contact.save();

    res.json(contact);
};

// Soft deleting a contact
exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact || contact.isDeleted) return res.status(404).json({ message: 'Contact not found' });

    contact.isDeleted = true; // Soft delete
    await contact.save();
    res.json({ message: 'Contact deleted successfully' });
};

// Batch processing
exports.batchProcessContacts = async (req, res) => {
    const contacts = req.body; // Expect an array of contact objects

    const processedContacts = await Contact.bulkCreate(contacts, { ignoreDuplicates: true });
    res.status(201).json(processedContacts);
};
