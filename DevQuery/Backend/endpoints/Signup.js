import { check, validationResult } from 'express-validator';
import User from '../Schema/UserSchema.js';
import bcrypt from 'bcrypt';

import { salt } from '../backend.js';

// signupValidator.js (middleware)
export const validateSignup = [
    check('username')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters')
        .trim()
        .escape(),

    check('email')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .withMessage('Password must contain at least one letter, one number, and one special character')
];

export const signup = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
 
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        console.log(`${username} : new user added successfully!`);
        res.status(201).json({ message: 'User registered successfully!' });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}