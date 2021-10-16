import { db } from "../firebase/config";

export const updateSiteControls = async (
	_: null,
	args: { showVenues: boolean; showPartners: boolean; siteAlert: string }
) => {
	// get the data ref
	const dataRef = db.collection("SiteControls").doc("OGClEEb6AfEiEebqoreH");

	// build the update object
	const updateObject = {
		...(typeof args.showVenues !== "undefined" &&
			args.showVenues !== null && {
				showVenues: args.showVenues,
			}),
		...(typeof args.showPartners !== "undefined" &&
			args.showPartners !== null && {
				showPartners: args.showPartners,
			}),
		...(args.siteAlert && { siteAlert: args.siteAlert }),
	};

	// update and get for return
	await dataRef.update({ ...updateObject });
	const data = await dataRef.get();
	return { ...data.data() };
};
