import { db } from "../firebase/config";

export const categories = async () => {
	const dataRef = db.collection("Category");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});

	// order the return docs
	let orderedReturnDocs: any = [];

	// breakfast
	let breakfastIdx = returnDocs.findIndex((elem: any) => {
		return elem.name === "Breakfast";
	});
	if (breakfastIdx != -1) {
		let breakfastItem = returnDocs.splice(breakfastIdx, 1);
		orderedReturnDocs.push(...breakfastItem);
	}

	// lunch
	let lunchIdx = returnDocs.findIndex((elem: any) => {
		return elem.name === "Lunch";
	});
	if (lunchIdx != -1) {
		let item = returnDocs.splice(lunchIdx, 1);
		orderedReturnDocs.push(...item);
	}

	// dinner
	let dinnerIdx = returnDocs.findIndex((elem: any) => {
		return elem.name === "Dinner";
	});
	if (dinnerIdx != -1) {
		let item = returnDocs.splice(dinnerIdx, 1);
		orderedReturnDocs.push(...item);
	}

	// desserts
	let dessertsIdx = returnDocs.findIndex((elem: any) => {
		return elem.name === "Dessert";
	});
	if (dessertsIdx != -1) {
		let item = returnDocs.splice(dessertsIdx, 1);
		orderedReturnDocs.push(...item);
	}

	// drinks
	let drinksIdx = returnDocs.findIndex((elem: any) => {
		return elem.name === "Drinks";
	});
	if (drinksIdx != -1) {
		let item = returnDocs.splice(drinksIdx, 1);
		orderedReturnDocs.push(...item);
	}

	orderedReturnDocs.push(...returnDocs);
	return orderedReturnDocs;
};

export const subcategories = async () => {
	const dataRef = db.collection("Subcategory");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const menuItems = async () => {
	const dataRef = db.collection("MenuItem");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const category = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("Category").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};

export const subcategory = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("Subcategory").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};

export const menuItem = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("MenuItem").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};

export const cateringCategories = async () => {
	const dataRef = db.collection("CateringCategory");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const cateringSubcategories = async () => {
	const dataRef = db.collection("CateringSubcategory");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const cateringMenuItems = async () => {
	const dataRef = db.collection("CateringMenuItem");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const cateringCategory = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("CateringCategory").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};

export const cateringSubcategory = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("CateringSubcategory").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};

export const cateringMenuItem = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("CateringMenuItem").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
};
