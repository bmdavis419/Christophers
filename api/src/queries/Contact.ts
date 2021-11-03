import { db } from "../firebase/config";

export const cateringContact = async () => {
	const dataRef = db.collection("CateringContact");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const resContact = async () => {
	const dataRef = db.collection("ResContact");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const services = async () => {
	const dataRef = db.collection("Service");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};
