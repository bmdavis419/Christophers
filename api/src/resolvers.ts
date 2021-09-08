import { db } from "./firebase/config";
import {
	homepageBanner,
	restaurantInfo,
	homepageCards,
	homepageFeatures,
} from "./queries/homepage";
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
import { restaurantFAQ, cateringFAQ } from "./queries/faq";
import { about } from "./queries/about";

export const resolvers = {
	Query: {
		cateringFAQ,
		restaurantFAQ,
		about,
		homepageCards,
		homepageFeatures,
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
		async subcategories(parent: { subcategories: string[] }) {
			let returnArr: Object[] = [];
			const subIDs = parent.subcategories.filter((item) => {
				return item !== "";
			});

			if (subIDs.length > 0) {
				// get the subcats
				const dataRefs = subIDs.map((sub) => {
					const str = "Subcategory/" + sub;
					return db.doc(str);
				});
				const docs = await db.getAll(...dataRefs);
				docs.forEach((doc) => {
					const id = doc.id;
					returnArr.push({ ...doc.data(), id });
				});
				return returnArr;
			}
			return [];
		},
	},
	Subcategory: {
		async menuItems(parent: { menuItems: string[] }) {
			let returnArr: Object[] = [];

			const menuIDs = parent.menuItems.filter((item) => {
				return item !== "";
			});

			if (menuIDs.length > 0) {
				// get the subcats
				let dataRefs = menuIDs.map((sub) => {
					const str = "MenuItem/" + sub;
					return db.doc(str);
				});

				const docs = await db.getAll(...dataRefs);
				docs.forEach((doc) => {
					const id = doc.id;
					returnArr.push({ ...doc.data(), id });
				});
				return returnArr;
			}
			return [];
		},
	},
	MenuItem: {
		async subcategory(parent: { subcategory: string[] }) {
			// get the array from the parent
			const subIDs = parent.subcategory.filter((item) => {
				return item !== "";
			});

			if (subIDs.length > 0) {
				// go through each sub and add it to return array
				const dataRefs = subIDs.map((id) => {
					return db.doc(`Subcategory/${id}`);
				});

				// get the docs
				const docs = await db.getAll(...dataRefs);
				let returnArr: Object[] = [];
				docs.forEach((doc) => {
					const id = doc.id;
					returnArr.push({ ...doc.data(), id });
				});

				// return
				return returnArr;
			}
			return [];
		},
		async category(parent: { category: string[] }) {
			// get the array from the parent
			const catIDs = parent.category.filter((item) => {
				return item !== "";
			});

			if (catIDs.length > 0) {
				// go through each sub and add it to return array
				const dataRefs = catIDs.map((id) => {
					return db.doc(`Subcategory/${id}`);
				});

				// get the docs
				const docs = await db.getAll(...dataRefs);
				let returnArr: Object[] = [];
				docs.forEach((doc) => {
					const id = doc.id;
					returnArr.push({ ...doc.data(), id });
				});

				// return
				return returnArr;
			}
			return [];
		},
	},
};
