import { db } from "../firebase/config";

export const updateAbout = async (
	_: null,
	args: { topHeading: string; subHeading: string; content: string }
) => {
	// database ref
	const dbRef = db.collection("About").doc("mUXUVmuB7jt9NdBLscLg");

	// update
	await dbRef.update({ ...args });

	// return the updated content
	const data = await dbRef.get();
	return { ...data.data(), id: data.id };
};

export const updateCateringAbout = async (
	_: null,
	args: { topHeading: string; subHeading: string; content: string }
) => {
	// database ref
	const dbRef = db.collection("CateringAbout").doc("pddchrzoSCy1CWltRNhO");

	// update
	await dbRef.update({ ...args });

	// return the updated content
	const data = await dbRef.get();
	return { ...data.data(), id: data.id };
};
