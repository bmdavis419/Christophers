import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updatePartner = async (
	_: any,
	args: {
		id: string;
        name?: string;
        image?: string;
        description?: string;
	}
) => {
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.image && { image: args.image }),
		...(args.description && { description: args.description }),
	};

	const docRef = db.collection("Partner").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removePartner = async (
	_: null,
	args: { id: string; }
) => {

	const ref = db.collection("Partner").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createPartner = async (
	_: null,
	args: {
        name: string;
        image: string;
        description: string;
	}
) => {
	// add to database
	const ref = db.collection("Partner");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

