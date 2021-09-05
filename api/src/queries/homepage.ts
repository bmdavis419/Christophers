import { db } from "../firebase/config";

export const homepageBanner = async () => {
	const dataRef = db.collection("HomepageBanner").doc("YRV97cGgiq6ZhuXWWiKh");
	const doc = await dataRef.get();
	return { ...doc.data() };
};

export const restaurantInfo = async () => {
	const dataRef = db.collection("RestaurantInfo").doc("b1tgnjUQ2UbJmoWuPQ0x");
	const doc = await dataRef.get();
	return doc.data();
};

export const homepageFeatures = async () => {
	const dataRef = db.collection("HomepageFeature");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		returnDocs.push(doc.data());
	});
	return returnDocs;
};

export const homepageCards = async () => {
	const dataRef = db.collection("HomepageCard");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		returnDocs.push(doc.data());
	});
	return returnDocs;
};
