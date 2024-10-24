const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Contact = require('../src/models/Contact');

const seedDatabase = async () => {
    // Create users
    await User.bulkCreate([
        { email: 'user1@example.com', password: 'hashed_password_1' },
        { email: 'user2@example.com', password: 'hashed_password_2' },
        { email: 'user3@example.com', password: 'hashed_password_3' },
    ]);

    // Create contacts
    const users = await User.findAll(); // Fetch all users to associate contacts

    await Contact.bulkCreate([
        { userId: users[0].id, name: 'John Doe', phone: '1234567890', email: 'john@example.com' },
        { userId: users[0].id, name: 'Jane Doe', phone: '0987654321', email: 'jane@example.com' },
        { userId: users[1].id, name: 'Alice Smith', phone: '5551234567', email: 'alice@example.com' },
    ]);

    console.log('Database seeded successfully');
};

// Run the seed script
sequelize.sync().then(seedDatabase).catch(console.error);
