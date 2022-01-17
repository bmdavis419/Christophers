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
			services {
				id
				name
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
	const [addService, { loading: loadingAdd }] = useMutation(gql`
		mutation Mutation($name: String) {
			addService(name: $name) {
				id
				name
			}
		}
	`);
	const [removeService, { loading: loadingRemove }] = useMutation(gql`
		mutation Mutation($removeServiceId: ID) {
			removeService(id: $removeServiceId)
		}
	`);

	// state
	const [siteState, setSiteState] = useState<SiteControlsInterface | null>(
		null
	);
	const [services, setServices] = useState<{ name: string; id: string }[]>([]);
	const [newService, setNewService] = useState("");

	// fill state
	useEffect(() => {
		if (data) {
			setSiteState({ ...data.siteControls });
			setServices([...data.services]);
			console.log(data);
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
				<div>
					<h3 className="text-center text-2xl text-primary my-2">
						Manage Services
					</h3>
					{services &&
						services.map((service) => {
							return (
								<div key={service.id}>
									{service.name}{" "}
									<button
										className="bg-primary px-2 py-2 font-bold hover:bg-secondary text-white"
										onClick={(e) => {
											e.preventDefault();
											removeService({
												variables: { removeServiceId: service.id },
												refetchQueries: [GET_SITE_CONTROLS],
											});
										}}
									>
										{loadingRemove ? "...loading" : "Delete"}
									</button>
								</div>
							);
						})}
				</div>
				<div>
					<label htmlFor="newService">New Service</label>
					<input
						type="text"
						value={newService}
						onChange={(e) => {
							setNewService(e.target.value);
						}}
						className="w-full bg-white rounded-lg shadow-inner px-2 py-1"
					/>
					<button
						className="bg-primary px-2 py-2 font-bold hover:bg-secondary text-white mt-2"
						onClick={(e) => {
							e.preventDefault();
							addService({
								variables: {
									name: newService,
								},
								refetchQueries: [GET_SITE_CONTROLS],
							});
						}}
					>
						Add Service
					</button>
				</div>
			</div>
		</div>
	);
}
