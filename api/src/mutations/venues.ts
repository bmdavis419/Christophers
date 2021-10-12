import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updateVenue = async (
	_: null,
	args: {
		id: string;
		name?: string;
		image?: string;
		description?: string;
		bannerImage?: string;
	}
) => {
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.image && { image: args.image }),
		...(args.description && { description: args.description }),
		...(args.bannerImage && { bannerImage: args.bannerImage }),
	};

	const docRef = db.collection("Venue").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeVenue = async (_: null, args: { id: string }) => {
	const ref = db.collection("Venue").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createVenue = async (
	_: null,
	args: {
		name: string;
		image: string;
		description: string;
		bannerImage: string;
	}
) => {
	// add to database
	const ref = db.collection("Venue");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};
