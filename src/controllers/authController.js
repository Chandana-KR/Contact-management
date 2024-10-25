const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail, sendResetCode } = require('../services/emailService'); 

// Register user
exports.register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });
    sendVerificationEmail(user.email); // Send email verification

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
};

// Verify email
exports.verifyEmail = async (req, res) => {
    const { email } = req.params; 
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isVerified = true;
    await user.save();
    res.json({ message: 'Email verified successfully' });
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
    await user.save();
    sendResetCode(user.email, user.resetCode); 
    res.json({ message: 'Password reset code sent to email' });
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    const user = await User.findOne({ where: { email, resetCode } });

    if (!user) return res.status(400).json({ message: 'Invalid reset code' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCode = null; // Clear the reset code
    await user.save();
    res.json({ message: 'Password reset successfully' });
};
