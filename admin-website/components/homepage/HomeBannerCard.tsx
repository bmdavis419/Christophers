import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	homepageBanner: {
		topText: string;
		midText: string;
		bottomText: string;
		leftLinkText: string;
		leftLink: string;
		rightLinkText: string;
		rightLink: string;
		images: string[];
	};
}

export default function CateringHomeBannerCard(props: PropsInterface) {
	const { homepageBanner } = props;
	const [homepageBannerState, setHomepageBannerState] =
		useState(homepageBanner);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [updateHomepageBanner, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$updateHomepageBannerRightLink: String
			$updateHomepageBannerRightLinkText: String
			$updateHomepageBannerLeftLink: String
			$updateHomepageBannerLeftLinkText: String
			$updateHomepageBannerBottomText: String
			$updateHomepageBannerMidText: String
			$updateHomepageBannerTopText: String
			$updateHomepageBannerImages: [String]
		) {
			updateHomepageBanner(
				rightLink: $updateHomepageBannerRightLink
				rightLinkText: $updateHomepageBannerRightLinkText
				leftLink: $updateHomepageBannerLeftLink
				leftLinkText: $updateHomepageBannerLeftLinkText
				bottomText: $updateHomepageBannerBottomText
				midText: $updateHomepageBannerMidText
				topText: $updateHomepageBannerTopText
				images: $updateHomepageBannerImages
			) {
				topText
				midText
				bottomText
				leftLinkText
				leftLink
				rightLinkText
				rightLink
				images
			}
		}
	`);

	return (
		<div className="mb-7 px-4 rounded-xl shadow-lg py-4 mx-5">
			<h1 className="text-center font-bold text-primary text-xl">
				Homepage Banner
			</h1>
			<div className="">
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="topText"
					>
						topText
					</label>
					<input
						id="topText"
						type="text"
						placeholder="topText"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.topText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								topText: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="midText"
					>
						midText
					</label>
					<input
						id="midText"
						type="text"
						placeholder="midText"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.midText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								midText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="bottomText"
					>
						bottomText
					</label>
					<input
						id="bottomText"
						type="text"
						placeholder="bottomText"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.bottomText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								bottomText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="leftLinkText"
					>
						leftLinkText
					</label>
					<input
						id="leftLinkText"
						type="text"
						placeholder="leftLinkText"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.leftLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								leftLinkText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="leftLink"
					>
						leftLink
					</label>
					<input
						id="leftLink"
						type="text"
						placeholder="leftLink"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.leftLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								leftLink: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="rightLinkText"
					>
						rightLinkText
					</label>
					<input
						id="rightLinkText"
						type="text"
						placeholder="rightLinkText"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.rightLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								rightLinkText: e.target.value,
							});
						}}
					/>
				</div>
				<div>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="rightLink"
					>
						rightLink
					</label>
					<input
						id="rightLink"
						type="text"
						placeholder="rightLink"
						className="bg-gray-300 px-3 py-3 rounded-lg w-full"
						value={homepageBannerState.rightLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setHomepageBannerState({
								...homepageBannerState,
								rightLink: e.target.value,
							});
						}}
					/>
				</div>

				<div className="w-full flex justify-center mt-5">
					<button
						className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block disabled:opacity-50"
						disabled={!canUpdate}
						onClick={(e) => {
							setCanUpdate(false);

							updateHomepageBanner({
								variables: {
									updateHomepageBannerTopText: homepageBannerState.topText,
									updateHomepageBannerMidText: homepageBannerState.midText,
									updateHomepageBannerBottomText:
										homepageBannerState.bottomText,
									updateHomepageBannerLeftLinkText:
										homepageBannerState.leftLinkText,
									updateHomepageBannerLeftLink: homepageBannerState.leftLink,
									updateHomepageBannerRightLinkText:
										homepageBannerState.rightLinkText,
									updateHomepageBannerRightLink: homepageBannerState.rightLink,
									updateHomepageBannerImages: homepageBannerState.images,
								},
							});
						}}
					>
						{loading ? "...loading" : "Update"}
					</button>
				</div>
			</div>
		</div>
	);
}
