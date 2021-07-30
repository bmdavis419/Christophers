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
