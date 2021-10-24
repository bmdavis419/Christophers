import { db, auth } from "../firebase/config";

export const addUser = async (
	_: null,
	args: { name: string; email: string; password: string }
) => {
	// get collection ref
	const dbRef = db.collection("User");

	// add the user to auth
	const userInfo = await auth.createUser({
		email: args.email,
		password: args.password,
	});

	// add to database
	await dbRef.doc(userInfo.uid).set({
		email: args.email,
		name: args.name,
	});

	return {
		id: userInfo.uid,
		email: args.email,
		name: args.name,
	};
};

export const removeUser = async (_: null, args: { id: string }) => {
	// get doc ref
	const docRef = db.collection("User").doc(args.id);

	// remove and return id
	await docRef.delete();
	return args.id;
};
