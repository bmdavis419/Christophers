import { db } from "../firebase/config";

export const about = async () => {
	const dataRef = db.collection("About").doc("mUXUVmuB7jt9NdBLscLg");
	const doc = await dataRef.get();
	return { ...doc.data() };
};

export const cateringAbout = async () => {
	const dataRef = db.collection("CateringAbout").doc("pddchrzoSCy1CWltRNhO");
	const doc = await dataRef.get();
	return { ...doc.data() };
};
