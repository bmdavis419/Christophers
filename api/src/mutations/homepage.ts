import { db } from "../firebase/config";

export const updateHomepageBanner = async (
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
		...(args.images && { images: [...args.images] }),
	};

	const docRef = db.collection("HomepageBanner").doc("YRV97cGgiq6ZhuXWWiKh");
	console.log(updateObject);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const updateRestaurantInfo = async (
	_: any,
	args: {
		monday?: string;
		tuesday?: string;
		wednesday?: string;
		thursday?: string;
		friday?: string;
		saturday?: string;
		sunday?: string;
		phone?: string;
		location?: string;
		locationLink?: string;
	}
) => {
	const updateObject = {
		...(args.monday && { monday: args.monday }),
		...(args.tuesday && { tuesday: args.tuesday }),
		...(args.wednesday && { wednesday: args.wednesday }),
		...(args.thursday && { thursday: args.thursday }),
		...(args.friday && { friday: args.friday }),
		...(args.saturday && { saturday: args.saturday }),
		...(args.sunday && { sunday: args.sunday }),
		...(args.phone && { phone: args.phone }),
		...(args.location && { location: args.location }),
		...(args.locationLink && { locationLink: args.locationLink }),
	};

	const docRef = db.collection("RestaurantInfo").doc("b1tgnjUQ2UbJmoWuPQ0x");
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const updateHomepageCard = async (
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
		...(args.content && { content: args.content }),
	};

	const docRef = db.collection("HomepageCard").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeHomepageCard = async (_: null, args: { id: string }) => {
	const ref = db.collection("HomepageCard").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createHomepageCard = async (
	_: null,
	args: {
		title: string;
		date: string;
		content: string;
	}
) => {
	// add to database
	const ref = db.collection("HomepageCard");
	const res = await ref.add({
		...args,
	});

	// get the card and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

export const updateHomepageFeature = async (
	_: any,
	args: {
		id: string;
		title?: string;
		description?: string;
		topLinkText?: string;
		topLink?: string;
		bottomLinkText?: string;
		bottomLink?: string;
		image?: string[];
	}
) => {
	const updateObject = {
		...(args.title && { title: args.title }),
		...(args.description && { description: args.description }),
		...(args.topLinkText && { topLinkText: args.topLinkText }),
		...(args.topLink && { topLink: args.topLink }),
		...(args.bottomLinkText && { bottomLinkText: args.bottomLinkText }),
		...(args.bottomLink && { bottomLink: args.bottomLink }),
		...(args.image && { image: [...args.image] }),
	};

	const docRef = db.collection("HomepageFeature").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data() };
};

export const removeHomepageFeature = async (_: null, args: { id: string }) => {
	const ref = db.collection("HomepageFeature").doc(args.id);
	await ref.delete();
	return args.id;
};

export const createHomepageFeature = async (
	_: null,
	args: {
		title: string;
		description: string;
		topLinkText: string;
		topLink: string;
		bottomLinkText: string;
		bottomLink: string;
		image: string[];
	}
) => {
	// add to database
	const ref = db.collection("HomepageFeature");
	const res = await ref.add({
		...args,
	});

	// get the Feature and return it
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: data.id };
};
