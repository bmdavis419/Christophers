import { firestore } from "firebase-admin";
import { db } from "../firebase/config";

export const createCateringCategory = async (
	_: null,
	args: { name: string }
) => {
	const res = await db
		.collection("CateringCategory")
		.add({ ...args, subcategories: [] });

	const data = await db.collection("CateringCategory").doc(res.id).get();

	return { ...data.data(), id: data.id };
};

export const updateCateringCategory = async (
	_: null,
	args: { name: string; id: string }
) => {
	await db
		.collection("CateringCategory")
		.doc(args.id)
		.update({ name: args.name });
	const data = await db.collection("CateringCategory").doc(args.id).get();
	return { ...data.data(), id: data.id };
};

export const deleteCateringCategory = async (_: null, args: { id: string }) => {
	// get the category to make sure it does not have any sub categories
	const data = await db.collection("CateringCategory").doc(args.id).get();
	const dataValues = data.data();
	if (dataValues != undefined) {
		if (dataValues.subcategories.length != 0)
			return new Error("Cannot delete a Category that has Subcategories.");
	}
	await db.collection("Category").doc(args.id).delete();
	return args.id;
};

export const createCateringSubcategory = async (
	_: null,
	args: { name: string; category: string }
) => {
	const res = await db
		.collection("CateringSubcategory")
		.add({ ...args, menuItems: [] });

	// update category array
	await db
		.collection("CateringCategory")
		.doc(args.category)
		.update({
			subcategories: firestore.FieldValue.arrayUnion(res.id),
		});

	const data = await db.collection("CateringSubcategory").doc(res.id).get();

	return { ...data.data(), id: data.id };
};

export const updateCateringSubcategory = async (
	_: null,
	args: { name: string; id: string }
) => {
	await db
		.collection("CateringSubcategory")
		.doc(args.id)
		.update({ name: args.name });
	const data = await db.collection("CateringSubcategory").doc(args.id).get();
	return { ...data.data(), id: data.id };
};

export const deleteCateringSubcategory = async (
	_: null,
	args: { id: string; catID: string }
) => {
	// make sure the subcategory does not have any menu items
	const data = await db.collection("CateringSubcategory").doc(args.id).get();
	const dataValues = data.data();
	if (dataValues && dataValues.menuItems.length != 0)
		return new Error("Cannot delete a Subcategory that contains Menu Items.");

	await db.collection("CateringSubcategory").doc(args.id).delete();
	await db
		.collection("CateringCategory")
		.doc(args.catID)
		.update({
			subcategories: firestore.FieldValue.arrayRemove(args.id),
		});
	return args.id;
};
