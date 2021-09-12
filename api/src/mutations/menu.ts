import { firestore } from "firebase-admin";
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

export const createMenuItem = async (
	_: null,
	args: {
		name: string;
		category: string;
		subcategory: string;
		description: string;
		price: string;
		image: string;
		type: number;
		isFeature: boolean;
		featureID?: string;
	}
) => {
	// add to database
	const menuRef = db.collection("MenuItem");
	const res = await menuRef.add({
		...args,
	});

	// check if it is a feature
	if (args.isFeature && args.featureID) {
		// add to the feature table
		const featureCategoryRef = db
			.collection("FeatureCateogry")
			.doc(args.featureID);
		featureCategoryRef.update({
			menuItems: firestore.FieldValue.arrayUnion(res.id),
		});
	}

	// get the menu item and return it
	const data = await menuRef.doc(res.id).get();
	return { ...data.data(), id: data.id };
};
