const User = require('../models/User');
const admin = require('../config/firebase');

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userRecord = await admin.auth().createUser({email, password});
    const firebaseUid = userRecord.uid;

    const mongoUser = new User({
      firebaseUid: firebaseUid,
      username: username,
      email: email,
    });

    await mongoUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};