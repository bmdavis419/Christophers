import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const updateCateringMenuItem = async (
	_: any,
	args: {
		id: string;
		name?: string;
		category?: string[];
		subcategory?: string[];
		description?: string;
		price?: string;
		image?: string;
	}
) => {
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.category && { category: args.category }),
		...(args.description && { description: args.description }),
		...(args.subcategory && { subcategory: args.subcategory }),
		...(args.price && { price: args.price }),
		...(args.image && { image: args.image }),
	};

	const docRef = db.collection("CateringMenuItem").doc(args.id);

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
				const dbRef = db.collection("CateringSubcategory").doc(subIDs[subID]);

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
						.collection("CateringSubcategory")
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

export const removeCateringMenuItem = async (
	_: null,
	args: { id: string; featureID?: string; subcatID: string[] }
) => {
	const subIDs = args.subcatID.filter((item) => {
		return item !== "";
	});

	if (subIDs.length > 0) {
		for (const subIdx in subIDs) {
			const updateRef2 = db
				.collection("CateringSubcategory")
				.doc(subIDs[subIdx]);
			updateRef2.update({
				menuItems: firestore.FieldValue.arrayRemove(args.id),
			});
		}
	}

	// delete menu item
	const removeRef2 = db.collection("CateringMenuItem").doc(args.id);
	await removeRef2.delete();
	return args.id;
};

export const createCateringMenuItem = async (
	_: null,
	args: {
		name: string;
		category: string[];
		subcategory: string[];
		description: string;
		price: string;
		image: string;
	}
) => {
	// add to database
	const menuRef = db.collection("CateringMenuItem");
	const res = await menuRef.add({
		...args,
	});

	// add to subcategory
	const subIDs = args.subcategory.filter((item) => {
		return item !== "";
	});

	// update each
	if (subIDs.length > 0) {
		// go through each doc
		for (const subID in subIDs) {
			// get the db ref
			const dbRef = db.collection("CateringSubcategory").doc(subIDs[subID]);

			// check if update is needed
			await dbRef.update({
				menuItems: firestore.FieldValue.arrayUnion(res.id),
			});
		}
	}

	// get the menu item and return it
	const data = await menuRef.doc(res.id).get();
	return { ...data.data(), id: data.id };
};
