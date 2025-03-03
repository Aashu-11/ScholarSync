require("dotenv").config();
const admin = require("firebase-admin");

// Ensure FIREBASE_CREDENTIALS is defined
if (!process.env.FIREBASE_CREDENTIALS) {
  throw new Error("Missing FIREBASE_CREDENTIALS environment variable");
}

// Parse the JSON string
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} catch (error) {
  console.error("Error parsing FIREBASE_CREDENTIALS JSON:", error);
  throw new Error("Invalid FIREBASE_CREDENTIALS format in .env file");
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
