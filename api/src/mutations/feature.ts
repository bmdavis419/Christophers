import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const createFeatureCategory = async (
	_: null,
	args: { name: string; menuItems?: string[]; daysOfWeek: number[] }
) => {
	// create the feature category
	const featureRef = db.collection("FeatureCategory");
	const res = await featureRef.add({ ...args });

	// update the menu items sent with it
	if (args.menuItems) {
		for (const item of args.menuItems) {
			// get the ref
			const updateRef = db.collection("MenuItem").doc(item);
			await updateRef.update({
				isFeature: true,
				featureID: res.id,
			});
		}
	}

	// get the data of the new feature category and send it back
	const data = await featureRef.doc(res.id).get();
	return { ...data.data(), id: data.id };
};

export const updateFeatureCategory = async (
	_: null,
	args: { id: string; name?: string; daysOfWeek?: number[] }
) => {
	// get the ref
	const featureRef = db.collection("FeatureCategory").doc(args.id);

	// update
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.daysOfWeek && { daysOfWeek: args.daysOfWeek }),
	};
	await featureRef.update({ ...updateObject });

	// send back the new item
	const data = await featureRef.get();
	return { ...data.data(), id: data.id };
};

export const deleteFeatureCategory = async (_: null, args: { id: string }) => {
	// get the ref and delte
	const deleteRef = db.collection("FeatureCategory").doc(args.id);

	const data = await deleteRef.get();
	const fCat = data.data();

	// make all features not features anymore
	if (fCat) {
		const menuIDs = fCat.menuItems.filter((item: string) => {
			return item !== "";
		});

		if (menuIDs.length > 0) {
			for (const id of menuIDs) {
				const doc = db.collection("MenuItem").doc(id);
				await doc.update({
					isFeature: false,
				});
			}
		}
	}

	await deleteRef.delete();
	return args.id;
};

export const makeItemFeature = async (
	_: null,
	args: { featureCatId: string; menuItemId: string }
) => {
	// get the menu and feature ref
	const menuRef = db.collection("MenuItem").doc(args.menuItemId);
	const featureRef = db.collection("FeatureCategory").doc(args.featureCatId);

	// update
	await menuRef.update({
		isFeature: true,
		featureID: args.featureCatId,
	});
	await featureRef.update({
		menuItems: firestore.FieldValue.arrayUnion(args.menuItemId),
	});

	// return
	const data = await menuRef.get();
	return { ...data.data(), id: data.id };
};

export const removeItemFeature = async (
	_: null,
	args: { featureCatId: string; menuItemId: string }
) => {
	// get the menu and feature ref
	const menuRef = db.collection("MenuItem").doc(args.menuItemId);
	const featureRef = db.collection("FeatureCategory").doc(args.featureCatId);

	// update
	await menuRef.update({
		isFeature: false,
		featureID: "",
	});
	await featureRef.update({
		menuItems: firestore.FieldValue.arrayRemove(args.menuItemId),
	});

	// return
	const data = await menuRef.get();
	return { ...data.data(), id: data.id };
};
