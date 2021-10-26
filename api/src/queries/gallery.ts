import { db } from "../firebase/config";

export const galleryImages = async () => {
	const dataRef = db.collection("Gallery");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		returnDocs.push({ ...doc.data(), id: doc.id });
	});
	return returnDocs;
};

export const restaurantGalleryImages = async () => {
	const dataRef = db.collection("RestaurantGallery");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		returnDocs.push({ ...doc.data(), id: doc.id });
	});
	return returnDocs;
};
