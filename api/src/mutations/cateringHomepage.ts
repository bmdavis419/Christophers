import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updateCateringHomepageBanner = async (
	_: any,
	args: {
		topText?: string;
		midText?: string;
		bottomText?: string;
		leftLinkText?: string;
		leftLink?: string;
		rightLinkText?: string;
		rightLink?: string;
		images?: string[];
	}
) => {
	const updateObject = {
		...(args.topText && { topText: args.topText }),
		...(args.midText && { midText: args.midText }),
		...(args.bottomText && { bottomText: args.bottomText }),
		...(args.leftLinkText && { leftLinkText: args.leftLinkText }),
		...(args.leftLink && { leftLink: args.leftLink }),
		...(args.rightLinkText && { rightLinkText: args.rightLinkText }),
        ...(args.rightLink && { rightLink: args.rightLink }),
        ...(args.images && { images: [...args.images] })
	};

	const docRef = db.collection("CateringHomepageBanner").doc("56KaiaRj8hpCiiBloiR2");
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const updateCateringHomepageCard = async (
	_: any,
	args: {
		id: string;
		title?: string;
		date?: string;
		content?: string;
	}
) => {
	const updateObject = {
		...(args.title && { title: args.title }),
		...(args.date && { date: args.date }),
		...(args.content && { content: args.content })
	};

	const docRef = db.collection("CateringHomepageCard").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeCateringHomepageCard = async (
	_: null,
	args: { id: string; }
) => {

	const ref = db.collection("CateringHomepageCard").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createCateringHomepageCard = async (
	_: null,
	args: {
		title: string;
		date: string;
		content: string;
	}
) => {
	// add to database
	const ref = db.collection("CateringHomepageCard");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

