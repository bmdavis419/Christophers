import { useMutation, useQuery } from "@apollo/client";
import { Switch } from "@headlessui/react";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

interface SiteControlsInterface {
	showPartners: boolean;
	showVenues: boolean;
	showResGallery: boolean;
	siteAlert: string;
}

export default function SiteControls() {
	// query to get the site controls
	const GET_SITE_CONTROLS = gql`
		{
			siteControls {
				showPartners
				showVenues
				siteAlert
				showResGallery
			}
		}
	`;

	// query
	const { data, loading, error } = useQuery(GET_SITE_CONTROLS);

	// muatation
	const [updateSiteControls, { loading: loadingUpdate }] = useMutation(gql`
		mutation Mutation(
			$siteAlert: String
			$showVenues: Boolean
			$showPartners: Boolean
			$showResGallery: Boolean
		) {
			updateSiteControls(
				siteAlert: $siteAlert
				showVenues: $showVenues
				showPartners: $showPartners
				showResGallery: $showResGallery
			) {
				showVenues
				showResGallery
				showPartners
				siteAlert
			}
		}
	`);

	// state
	const [siteState, setSiteState] = useState<SiteControlsInterface | null>(
		null
	);

	// fill state
	useEffect(() => {
		if (data) {
			setSiteState({ ...data.siteControls });
		}
	}, [data]);

	// make sure there is data before render
	if (loading || siteState === null) return <Loading />;
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div className="w-full flex justify-center">
			<div className="p-5 rounded-xl w-3/4 shadow-xl h-3/4 mt-5">
				<h1 className="text-primary text-center font-bold underline text-3xl mb-3">
					Site Controls
				</h1>
				<div className="mb-3">
					<Switch.Group>
						<div className="flex items-center">
							<Switch.Label className="mr-4">Enable Venue Page</Switch.Label>
							<Switch
								checked={siteState.showVenues}
								onChange={() => {
									setSiteState({
										...siteState,
										showVenues: !siteState.showVenues,
									});
								}}
								className={`${
									siteState.showVenues ? "bg-primary" : "bg-gray-200"
								} relative inline-flex items-center h-6 rounded-full w-11`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${
										siteState.showVenues ? "translate-x-6" : "translate-x-1"
									} inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200`}
								/>
							</Switch>
						</div>
					</Switch.Group>
				</div>
				<div className="mb-3">
					<Switch.Group>
						<div className="flex items-center">
							<Switch.Label className="mr-4">Enable Partner Page</Switch.Label>
							<Switch
								checked={siteState.showPartners}
								onChange={() => {
									setSiteState({
										...siteState,
										showPartners: !siteState.showPartners,
									});
								}}
								className={`${
									siteState.showPartners ? "bg-primary" : "bg-gray-200"
								} relative inline-flex items-center h-6 rounded-full w-11`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${
										siteState.showPartners ? "translate-x-6" : "translate-x-1"
									} inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200`}
								/>
							</Switch>
						</div>
					</Switch.Group>
				</div>
				<div className="mb-3">
					<Switch.Group>
						<div className="flex items-center">
							<Switch.Label className="mr-4">
								Enable Restaurant Gallery Page
							</Switch.Label>
							<Switch
								checked={siteState.showResGallery}
								onChange={() => {
									setSiteState({
										...siteState,
										showResGallery: !siteState.showResGallery,
									});
								}}
								className={`${
									siteState.showResGallery ? "bg-primary" : "bg-gray-200"
								} relative inline-flex items-center h-6 rounded-full w-11`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${
										siteState.showResGallery ? "translate-x-6" : "translate-x-1"
									} inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-200`}
								/>
							</Switch>
						</div>
					</Switch.Group>
				</div>
				<div className="mb-3">
					<label htmlFor="alert" className="block">
						Site Alert
					</label>
					<textarea
						name="alert"
						id="alert"
						rows={5}
						className="w-full bg-gray-300 rounded-lg bg-opacity-50 px-3 py-3"
						value={siteState.siteAlert}
						onChange={(e) => {
							setSiteState({ ...siteState, siteAlert: e.target.value });
						}}
					></textarea>
				</div>
				<div className="flex justify-center">
					<button
						className="bg-primary text-white rounded-full px-3 py-2 font-bold hover:bg-secondary"
						onClick={(e) => {
							e.preventDefault();
							updateSiteControls({
								variables: {
									siteAlert: siteState.siteAlert,
									showVenues: siteState.showVenues,
									showPartners: siteState.showPartners,
								},
							});
						}}
					>
						{loadingUpdate ? "...loading" : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
