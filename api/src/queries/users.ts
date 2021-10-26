import { db } from "../firebase/config";

export const users = async () => {
	// get collection ref
	const dbRef = db.collection("User");

	// get the users
	const docs = await dbRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};
