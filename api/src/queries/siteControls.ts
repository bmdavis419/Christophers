import { db } from "../firebase/config";

export const siteControls = async () => {
	const dataRef = db.collection("SiteControls").doc("OGClEEb6AfEiEebqoreH");
	const doc = await dataRef.get();
	return { ...doc.data() };
};
