import { db } from "../firebase/config";

export const venues = async () => {
	const dataRef = db.collection("Venue");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({...doc.data(), id});
	});
	return returnDocs;
};