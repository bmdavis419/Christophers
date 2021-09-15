import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updateMenuItem = async (
	_: any,
	args: {
		id: string;
		name?: string;
		category?: string[];
		subcategory?: string[];
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

	// get the original data
	const originalDoc = await docRef.get();
	const originalData = originalDoc.data();

	// update the doc
	await docRef.update({ ...updateObject });

	// update the subcategory
	if (args.category && args.subcategory && originalData) {
		// get the subcategories from update
		const subIDs = args.subcategory.filter((item) => {
			return item !== "";
		});

		if (subIDs.length > 0) {
			// go through each doc
			for (const subID in subIDs) {
				// get the db ref
				const dbRef = db.collection("Subcategory").doc(subIDs[subID]);

				// get
				const doc = await dbRef.get();

				// check if update is needed
				let docData = doc.data();
				if (docData && !docData.menuItems.includes(args.id)) {
					await dbRef.update({
						menuItems: firestore.FieldValue.arrayUnion(args.id),
					});
				}
			}

			// check the original doc to make sure that it only has correct menu items
			for (const docIdx in originalData.subcategory) {
				if (!subIDs.includes(originalData.subcategory[docIdx])) {
					// remove the menu item from the sub
					await db
						.collection("Subcategory")
						.doc(originalData.subcategory[docIdx])
						.update({
							menuItems: firestore.FieldValue.arrayRemove(args.id),
						});
				}
			}
		}
	}

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
