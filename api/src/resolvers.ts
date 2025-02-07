import { db } from "./firebase/config";
import {
	homepageBanner,
	restaurantInfo,
	homepageCards,
	homepageFeatures,
	cateringHomepageBanner,
	cateringHomepageCards,
} from "./queries/homepage";
import {
	categories,
	menuItems,
	subcategories,
	category,
	menuItem,
	subcategory,
	cateringCategories,
	cateringSubcategories,
	cateringMenuItems,
	cateringCategory,
	cateringSubcategory,
	cateringMenuItem,
} from "./queries/menu";
import {
	updateMenuItem,
	removeMenuItem,
	createMenuItem,
} from "./mutations/menu";
import { restaurantFAQ, cateringFAQ } from "./queries/faq";
import { about, cateringAbout } from "./queries/about";
import {
	createFeatureCategory,
	updateFeatureCategory,
	deleteFeatureCategory,
	makeItemFeature,
	removeItemFeature,
} from "./mutations/feature";
import { featureCategories } from "./queries/feature";
import { galleryImages, restaurantGalleryImages } from "./queries/gallery";
import { venues } from "./queries/venue";
import { partners } from "./queries/partner";
import {
	createCategory,
	deleteCategory,
	updateCategory,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
} from "./mutations/catAndSubcat";
import {
	createCateringCategory,
	createCateringSubcategory,
	updateCateringCategory,
	updateCateringSubcategory,
	deleteCateringCategory,
	deleteCateringSubcategory,
} from "./mutations/cateringCatAndSubcat";
import {
	updateCateringHomepageBanner,
	updateCateringHomepageCard,
	removeCateringHomepageCard,
	createCateringHomepageCard,
} from "./mutations/cateringHomepage";
import {
	updateCateringFAQ,
	removeCateringFAQ,
	createCateringFAQ,
	updateRestaurantFAQ,
	removeRestaurantFAQ,
	createRestaurantFAQ,
} from "./mutations/faq";
import { updateVenue, removeVenue, createVenue } from "./mutations/venues";
import {
	updatePartner,
	removePartner,
	createPartner,
} from "./mutations/partner";
import {
	updateHomepageBanner,
	updateRestaurantInfo,
	updateHomepageCard,
	removeHomepageCard,
	createHomepageCard,
	updateHomepageFeature,
	removeHomepageFeature,
	createHomepageFeature,
} from "./mutations/homepage";
import {
	createCateringMenuItem,
	updateCateringMenuItem,
	removeCateringMenuItem,
} from "./mutations/cateringMenu";
import { updateAbout, updateCateringAbout } from "./mutations/about";
import {
	createGalleryImage,
	deleteGalleryImage,
	updateGalleryImage,
	createRestaurantGalleryImage,
	deleteRestaurantGalleryImage,
	updateRestaurantGalleryImage,
} from "./mutations/gallery";
import { cateringContact, resContact, services } from "./queries/Contact";
import { siteControls } from "./queries/siteControls";
import { updateSiteControls } from "./mutations/siteControls";
import { addUser, removeUser } from "./mutations/users";
import { users } from "./queries/users";
import {
	addCateringContact,
	archiveCateringContact,
	addResContact,
	archiveResContact,
	addService,
	removeService,
} from "./mutations/contact";

export const resolvers = {
	Query: {
		users,
		cateringContact,
		resContact,
		services,
		siteControls,
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
		featureCategories,
		cateringHomepageCards,
		cateringHomepageBanner,
		cateringAbout,
		cateringCategories,
		cateringSubcategories,
		cateringMenuItems,
		cateringCategory,
		cateringSubcategory,
		cateringMenuItem,
		galleryImages,
		restaurantGalleryImages,
		venues,
		partners,
	},
	Mutation: {
		addUser,
		removeUser,
		addCateringContact,
		archiveCateringContact,
		addResContact,
		archiveResContact,
		addService,
		removeService,
		updateCateringAbout,
		createCateringMenuItem,
		updateSiteControls,
		updateCateringMenuItem,
		removeCateringMenuItem,
		createCateringCategory,
		createCateringSubcategory,
		updateCateringCategory,
		updateCateringSubcategory,
		deleteCateringCategory,
		deleteCateringSubcategory,
		updateMenuItem,
		removeMenuItem,
		createMenuItem,
		createFeatureCategory,
		updateFeatureCategory,
		deleteFeatureCategory,
		makeItemFeature,
		removeItemFeature,
		updateAbout,
		createCategory,
		deleteCategory,
		updateCategory,
		createSubcategory,
		updateSubcategory,
		deleteSubcategory,
		updateCateringHomepageBanner,
		updateCateringHomepageCard,
		removeCateringHomepageCard,
		createCateringHomepageCard,
		updateCateringFAQ,
		removeCateringFAQ,
		createCateringFAQ,
		updateRestaurantFAQ,
		removeRestaurantFAQ,
		createRestaurantFAQ,
		updateVenue,
		removeVenue,
		createVenue,
		updatePartner,
		removePartner,
		createPartner,
		updateHomepageBanner,
		updateRestaurantInfo,
		updateHomepageCard,
		removeHomepageCard,
		createHomepageCard,
		updateHomepageFeature,
		removeHomepageFeature,
		createHomepageFeature,
		createGalleryImage,
		deleteGalleryImage,
		updateGalleryImage,
		createRestaurantGalleryImage,
		deleteRestaurantGalleryImage,
		updateRestaurantGalleryImage,
	},
	CateringContact: {
		async venue(parent: { venue: string }) {
			const docRef = db.collection("Venue").doc(parent.venue);
			const data = await docRef.get();
			return { ...data.data(), id: parent.venue };
		},
		async service(parent: { service: string }) {
			const docRef = db.collection("Service").doc(parent.service);
			const data = await docRef.get();
			return { ...data.data(), id: parent.service };
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
	CateringCategory: {
		async subcategories(parent: { subcategories: string[] }) {
			let returnArr: Object[] = [];
			const subIDs = parent.subcategories.filter((item) => {
				return item !== "";
			});

			if (subIDs.length > 0) {
				// get the subcats
				const dataRefs = subIDs.map((sub) => {
					const str = "CateringSubcategory/" + sub;
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
	FeatureCategory: {
		async menuItems(parent: { menuItems: string[] }) {
			let returnArry: Object[] = [];

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
					returnArry.push({ ...doc.data(), id });
				});
				return returnArry;
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
	CateringSubcategory: {
		async menuItems(parent: { menuItems: string[] }) {
			let returnArr: Object[] = [];

			const menuIDs = parent.menuItems.filter((item) => {
				return item !== "";
			});

			if (menuIDs.length > 0) {
				// get the subcats
				let dataRefs = menuIDs.map((sub) => {
					const str = "CateringMenuItem/" + sub;
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
					return db.doc(`Category/${id}`);
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
	CateringMenuItem: {
		async subcategory(parent: { subcategory: string[] }) {
			// get the array from the parent
			const subIDs = parent.subcategory.filter((item) => {
				return item !== "";
			});

			if (subIDs.length > 0) {
				// go through each sub and add it to return array
				const dataRefs = subIDs.map((id) => {
					return db.doc(`CateringSubcategory/${id}`);
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
					return db.doc(`CateringCategory/${id}`);
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
