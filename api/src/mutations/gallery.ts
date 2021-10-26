import { db } from "../firebase/config";

export const createGalleryImage = async (
	_: null,
	args: { name: string; description: string }
) => {
	// add to database
	const ref = db.collection("Gallery");
	const res = await ref.add({
		...args,
	});

	// get and return
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: ref.id };
};

export const updateGalleryImage = async (
	_: null,
	args: { image?: string; description?: string; id: string }
) => {
	// create the update object
	const updateObject = {
		...(args.image && { image: args.image }),
		...(args.description && { description: args.description }),
	};

	// get the ref and update
	const docRef = db.collection("Gallery").doc(args.id);
	await docRef.update({ ...updateObject });

	// get the return data
	const data = await docRef.get();
	return { ...data.data(), id: args.id };
};

export const deleteGalleryImage = async (_: null, args: { id: string }) => {
	const docRef = db.collection("Gallery").doc(args.id);
	await docRef.delete();
	return args.id;
};

export const createRestaurantGalleryImage = async (
	_: null,
	args: { name: string; description: string }
) => {
	// add to database
	const ref = db.collection("RestaurantGallery");
	const res = await ref.add({
		...args,
	});

	// get and return
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: ref.id };
};

export const updateRestaurantGalleryImage = async (
	_: null,
	args: { image?: string; description?: string; id: string }
) => {
	// create the update object
	const updateObject = {
		...(args.image && { image: args.image }),
		...(args.description && { description: args.description }),
	};

	// get the ref and update
	const docRef = db.collection("RestaurantGallery").doc(args.id);
	await docRef.update({ ...updateObject });

	// get the return data
	const data = await docRef.get();
	return { ...data.data(), id: args.id };
};

export const deleteRestaurantGalleryImage = async (_: null, args: { id: string }) => {
	const docRef = db.collection("RestaurantGallery").doc(args.id);
	await docRef.delete();
	return args.id;
};
