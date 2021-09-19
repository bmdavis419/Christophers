import { db } from "../firebase/config";

export const partners = async () => {
	const dataRef = db.collection("Partner");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({...doc.data(), id});
	});
	return returnDocs;
};