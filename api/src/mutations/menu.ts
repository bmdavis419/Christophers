import { db } from "../firebase/config";

export const updateMenuItem = async (
	_: any,
	args: {
		id: string;
		name?: string;
		category?: string;
		subcategory?: string;
		description?: string;
		price?: string;
		image?: string;
		type?: number;
	}
) => {
	const updateObject = {
		...(args.name && { name: args.name }),
		...(args.category && { category: args.category }),
		...(args.description && { description: args.description }),
		...(args.subcategory && { subcategory: args.subcategory }),
		...(args.price && { price: args.price }),
		...(args.image && { image: args.image }),
		...(args.type && { type: args.type }),
	};

	const docRef = db.collection("MenuItem").doc(args.id);
	await docRef.update({ ...updateObject });
	const data = await docRef.get();
	return { ...data.data(), id: args.id };
};
