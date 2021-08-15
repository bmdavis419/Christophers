import { db } from "./firebase/config";
import { homepageBanner, restaurantInfo } from "./queries/homepage";
import {
	categories,
	menuItems,
	subcategories,
	category,
	menuItem,
	subcategory,
} from "./queries/menu";
import { updateMenuItem } from "./mutations/menu";

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
	},
	Mutation: {
		updateMenuItem,
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
