import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updateCateringFAQ = async (
	_: any,
	args: {
		id: string;
        question?: string;
        answer?: string;
	}
) => {
	const updateObject = {
		...(args.question && { question: args.question }),
		...(args.answer && { answer: args.answer }),
	};

	const docRef = db.collection("CateringFAQ").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeCateringFAQ = async (
	_: null,
	args: { id: string; }
) => {

	const ref = db.collection("CateringFAQ").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createCateringFAQ = async (
	_: null,
	args: {
        question: string;
        answer: string;
	}
) => {
	// add to database
	const ref = db.collection("CateringFAQ");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

export const updateRestaurantFAQ = async (
	_: any,
	args: {
		id: string;
        question?: string;
        answer?: string;
	}
) => {
	const updateObject = {
		...(args.question && { question: args.question }),
		...(args.answer && { answer: args.answer }),
	};

	const docRef = db.collection("RestaurantFAQ").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeRestaurantFAQ = async (
	_: null,
	args: { id: string; }
) => {

	const ref = db.collection("RestaurantFAQ").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createRestaurantFAQ = async (
	_: null,
	args: {
        question: string;
        answer: string;
	}
) => {
	// add to database
	const ref = db.collection("RestaurantFAQ");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

