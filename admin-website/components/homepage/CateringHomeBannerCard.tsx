import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
	cateringHomepageBanner: {
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
	const { cateringHomepageBanner } = props;
	const [cateringHomepageBannerState, setCateringHomepageBannerState] =
		useState(cateringHomepageBanner);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [updateCateringHomepageBanner, { loading, error }] = useMutation(gql`
		mutation Mutation(
			$updateCateringHomepageBannerRightLink: String
			$updateCateringHomepageBannerRightLinkText: String
			$updateCateringHomepageBannerLeftLink: String
			$updateCateringHomepageBannerLeftLinkText: String
			$updateCateringHomepageBannerBottomText: String
			$updateCateringHomepageBannerMidText: String
			$updateCateringHomepageBannerTopText: String
			$updateCateringHomepageBannerImages: [String]
		) {
			updateCateringHomepageBanner(
				rightLink: $updateCateringHomepageBannerRightLink
				rightLinkText: $updateCateringHomepageBannerRightLinkText
				leftLink: $updateCateringHomepageBannerLeftLink
				leftLinkText: $updateCateringHomepageBannerLeftLinkText
				bottomText: $updateCateringHomepageBannerBottomText
				midText: $updateCateringHomepageBannerMidText
				topText: $updateCateringHomepageBannerTopText
				images: $updateCateringHomepageBannerImages
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
						value={cateringHomepageBannerState.topText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.midText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.bottomText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.leftLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.leftLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.rightLinkText}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
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
						value={cateringHomepageBannerState.rightLink}
						onChange={(e) => {
							e.preventDefault();
							setCanUpdate(true);
							setCateringHomepageBannerState({
								...cateringHomepageBannerState,
								rightLink: e.target.value,
							});
						}}
					/>
				</div>

				<button
					className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateCateringHomepageBanner({
							variables: {
								updateCateringHomepageBannerTopText:
									cateringHomepageBannerState.topText,
								updateCateringHomepageBannerMidText:
									cateringHomepageBannerState.midText,
								updateCateringHomepageBannerBottomText:
									cateringHomepageBannerState.bottomText,
								updateCateringHomepageBannerLeftLinkText:
									cateringHomepageBannerState.leftLinkText,
								updateCateringHomepageBannerLeftLink:
									cateringHomepageBannerState.leftLink,
								updateCateringHomepageBannerRightLinkText:
									cateringHomepageBannerState.rightLinkText,
								updateCateringHomepageBannerRightLink:
									cateringHomepageBannerState.rightLink,
								updateCateringHomepageBannerImages:
									cateringHomepageBannerState.images,
							},
						});
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
			</div>
		</div>
	);
}
