import { db } from "../firebase/config";

export const restaurantFAQ = async () => {
	const dataRef = db.collection("RestaurantFAQ");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({...doc.data(), id});
	});
	return returnDocs;
};

export const cateringFAQ = async () => {
	const dataRef = db.collection("CateringFAQ");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({...doc.data(), id});
	});
	return returnDocs;
};

