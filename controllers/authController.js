const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while registering user.', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1d' });
      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while logging in.', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
