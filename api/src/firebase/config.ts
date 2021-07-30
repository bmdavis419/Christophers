import admin from "firebase-admin";

// get the key
if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});

export const db = admin.firestore();
