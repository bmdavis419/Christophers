import { db } from "./firebase/config";
import { homepageBanner, restaurantInfo } from "./queries/homepage";
import {
	categories,
	menuItems,
	subcategories,
	category,
	menuItem,
	subcategory,
	feature,
	features,
} from "./queries/menu";
import {
	updateMenuItem,
	addFeature,
	removeFeature,
	removeMenuItem,
} from "./mutations/menu";

export const resolvers = {
	Query: {
		homepageBanner,
		restaurantInfo,
		categories,
		menuItems,
		subcategories,
		category,
		menuItem,
		subcategory,
		feature,
		features,
	},
	Mutation: {
		updateMenuItem,
		addFeature,
		removeFeature,
		removeMenuItem,
	},
	Feature: {
		async menuItem(parent: { menuItem: string }) {
			const docRef = db.collection("MenuItem").doc(parent.menuItem);
			const data = await docRef.get();
			return { ...data.data(), id: data.id };
		},
	},
	Category: {
		async subcategories(parent: { subcategories: [string] }) {
			let returnArr: any = [];
			// get the subcats
			const dataRefs = parent.subcategories.map((sub) => {
				const str = "Subcategory/" + sub;
				return db.doc(str);
			});
			const docs = await db.getAll(...dataRefs);
			docs.forEach((doc) => {
				const id = doc.id;
				returnArr.push({ ...doc.data(), id });
			});
			return returnArr;
		},
	},
	Subcategory: {
		async menuItems(parent: { menuItems: [string] }) {
			let returnArr: any = [];
			// get the subcats
			const dataRefs = parent.menuItems.map((sub) => {
				const str = "MenuItem/" + sub;
				return db.doc(str);
			});
			const docs = await db.getAll(...dataRefs);
			docs.forEach((doc) => {
				const id = doc.id;
				returnArr.push({ ...doc.data(), id });
			});
			return returnArr;
		},
	},
	MenuItem: {
		async subcategory(parent: { subcategory: string }) {
			if (parent.subcategory) {
				const dataRef = db.collection("Subcategory").doc(parent.subcategory);
				const doc = await dataRef.get();
				const id = doc.id;
				return { ...doc.data(), id };
			} else {
				return null;
			}
		},
		async category(parent: { category: string }) {
			if (parent.category) {
				const dataRef = db.collection("Category").doc(parent.category);
				const doc = await dataRef.get();
				const id = doc.id;
				return { ...doc.data(), id };
			} else {
				return null;
			}
		},
	},
};
