import { db } from "../firebase/config";

export const categories = async () => {
	const dataRef = db.collection("Category");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
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

export const features = async () => {
	const dataRef = db.collection("Feature");
	const docs = await dataRef.get();
	let returnDocs: any = [];
	docs.docs.forEach((doc) => {
		const id = doc.id;
		returnDocs.push({ ...doc.data(), id });
	});
	return returnDocs;
};

export const feature = async (_: null, args: { id: string }) => {
	const dataRef = db.collection("Feature").doc(args.id);
	const doc = await dataRef.get();
	const id = doc.id;
	return { ...doc.data(), id };
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
