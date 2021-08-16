import { db } from "../firebase/config";

export const updateMenuItem = async (
	_: any,
	args: {
		id: string;
		name?: string;
		category?: string;
		subcategory?: string;
		description?: string;
		price?: string;
		image?: string;
		type?: number;
	}
) => {
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.category && { category: args.category }),
		...(args.description && { description: args.description }),
		...(args.subcategory && { subcategory: args.subcategory }),
		...(args.price && { price: args.price }),
		...(args.image && { image: args.image }),
		...(args.type && { type: args.type }),
	};

	const docRef = db.collection("MenuItem").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data(), id: args.id };
};

export const addFeature = async (
	_: any,
	args: {
		menuID: string;
		type: string;
	}
) => {
	const docRef = db.collection("Feature");
	const res = await docRef.add({
		menuItem: args.menuID,
		type: args.type,
	});
	const data = await docRef.doc(res.id).get();

	// update the menu item to be a feature
	const menuRef = db.collection("MenuItem").doc(args.menuID);
	await menuRef.update({
		isFeature: true,
		featureID: data.id,
	});
	return { ...data.data(), id: res.id };
};

export const removeMenuItem = async (
	_: null,
	args: { id: string; featureID?: string }
) => {
	// check if it is a feature
	if (args.featureID) {
		// delete
		const removeRef1 = db.collection("Feature").doc(args.featureID);
		await removeRef1.delete();
	}

	// delete menu item
	const removeRef2 = db.collection("MenuItem").doc(args.id);
	await removeRef2.delete();
	return args.id;
};

export const removeFeature = async (
	_: null,
	args: { id: string; menuID: string }
) => {
	// remove the feature from the menu item
	const updateRef = db.collection("MenuItem").doc(args.menuID);
	await updateRef.update({
		isFeature: false,
	});

	// delete the feature
	const removeRef = db.collection("Feature").doc(args.id);
	await removeRef.delete();

	// return
	return args.id;
};
