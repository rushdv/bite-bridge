const admin = require('firebase-admin');

const initializeFirebase = () => {
    try {
        if (!process.env.FIREBASE_PROJECT_ID) return;

        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.includes('\\n')
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : process.env.FIREBASE_PRIVATE_KEY;

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey
            })
        });

        console.log("Firebase Admin Initialized");
    } catch (error) {
        console.error("Firebase Admin Error:", error.message);
    }
};

module.exports = initializeFirebase;
