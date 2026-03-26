const admin = require('firebase-admin');

const initializeFirebase = () => {
    try {
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.warn("Firebase Admin: FIREBASE_PROJECT_ID missing. Token verification will be skipped.");
            return;
        }

        // Handle both literal \n (from .env file) and real newlines (from Vercel dashboard)
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.includes('\\n')
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : process.env.FIREBASE_PRIVATE_KEY;

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey
            })
        });

        console.log("Firebase Admin Initialized successfully");
    } catch (error) {
        console.error("Firebase Admin Error:", error.message);
    }
};

module.exports = initializeFirebase;
