import { db } from "../firebase/config";

export const createFeatureCategory = async (
	_: null,
	args: { name: string; menuItems: string[]; daysOfWeek: number[] }
) => {
	// create the feature category
	const featureRef = db.collection("FeatureCategory");
	const res = await featureRef.add({ ...args });

	// update the menu items sent with it
	for (const item of args.menuItems) {
		// get the ref
		const updateRef = db.collection("MenuItem").doc(item);
		await updateRef.update({
			isFeature: true,
			featureID: res.id,
		});
	}

	// get the data of the new feature category and send it back
	const data = await featureRef.doc(res.id).get();
	return { ...data.data(), id: data.id };
};
