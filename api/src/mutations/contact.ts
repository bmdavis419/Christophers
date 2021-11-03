import { db } from "../firebase/config";

export const addCateringContact = async (_: null, args: any) => {
	// add to database
	const ref = db.collection("CateringContact");
	const res = await ref.add({
		...args,
		archived: false,
	});

	// get and return
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: ref.id };
};

export const addResContact = async (_: null, args: any) => {
	// add to database
	const ref = db.collection("ResContact");
	const res = await ref.add({
		...args,
		archived: false,
	});

	// get and return
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: ref.id };
};

export const addService = async (_: null, args: any) => {
	// add to database
	const ref = db.collection("Service");
	const res = await ref.add({
		...args,
	});

	// get and return
	const data = await ref.doc(res.id).get();
	return { ...data.data(), id: ref.id };
};

export const archiveCateringContact = async (_: null, args: { id: string }) => {
	// update
	const ref = db.collection("CateringContact").doc(args.id);
	await ref.update({
		archived: true,
	});

	// get and return
	const data = await ref.get();
	return { ...data.data(), id: ref.id };
};

export const archiveResContact = async (_: null, args: { id: string }) => {
	// update
	const ref = db.collection("ResContact").doc(args.id);
	await ref.update({
		archived: true,
	});

	// get and return
	const data = await ref.get();
	return { ...data.data(), id: ref.id };
};

export const removeService = async (_: null, args: { id: string }) => {
	const ref = db.collection("Service").doc(args.id);
	await ref.delete();
	return args.id;
};
