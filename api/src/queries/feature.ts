import { db } from "../firebase/config";

export const featureCategories = async () => {
	const dataRef = db.collection("FeatureCategory");
	const docs = await dataRef.get();
	let returnDocs: Object[] = [];
	docs.docs.forEach((doc) => {
		returnDocs.push({ ...doc.data(), id: doc.id });
	});
	return returnDocs;
};
