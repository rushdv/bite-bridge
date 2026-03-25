const admin = require('firebase-admin');

// Note: The user needs to provide serviceAccountKey.json or set GOOGLE_APPLICATION_CREDENTIALS
// For now, we'll try to initialize it with env variables or a local file if available.

const initializeFirebase = () => {
    try {
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.warn("Firebase Admin: FIREBASE_PROJECT_ID missing. Token verification may fail.");
            return;
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            })
        });
        console.log("Firebase Admin Initialized");
    } catch (error) {
        console.error("Firebase Admin Error:", error.message);
    }
};

module.exports = initializeFirebase;
