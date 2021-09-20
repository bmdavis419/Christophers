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
	const [cateringHomepageBannerState, setCateringHomepageBannerState] = useState(cateringHomepageBanner);
	const [canUpdate, setCanUpdate] = useState(false);

	// create the mutations
	const [
		updateCateringHomepageBanner,
		{ loading, error },
	] = useMutation(gql`
    mutation Mutation($updateCateringHomepageBannerRightLink: String, $updateCateringHomepageBannerRightLinkText: String, $updateCateringHomepageBannerLeftLink: String, $updateCateringHomepageBannerLeftLinkText: String, $updateCateringHomepageBannerBottomText: String, $updateCateringHomepageBannerMidText: String, $updateCateringHomepageBannerTopText: String, $updateCateringHomepageBannerImages: [String]) {
        updateCateringHomepageBanner(rightLink: $updateCateringHomepageBannerRightLink, rightLinkText: $updateCateringHomepageBannerRightLinkText, leftLink: $updateCateringHomepageBannerLeftLink, leftLinkText: $updateCateringHomepageBannerLeftLinkText, bottomText: $updateCateringHomepageBannerBottomText, midText: $updateCateringHomepageBannerMidText, topText: $updateCateringHomepageBannerTopText, images: $updateCateringHomepageBannerImages) {
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
		<div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.topText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, topText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.midText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, midText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.bottomText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, bottomText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.leftLinkText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, leftLinkText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.leftLink}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, leftLink: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.rightLinkText}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, rightLinkText: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={cateringHomepageBannerState.rightLink}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setCateringHomepageBannerState({ ...cateringHomepageBannerState, rightLink: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateCateringHomepageBanner({
							variables: {
								updateCateringHomepageBannerTopText: cateringHomepageBannerState.topText,
								updateCateringHomepageBannerMidText: cateringHomepageBannerState.midText,
								updateCateringHomepageBannerBottomText: cateringHomepageBannerState.bottomText,
								updateCateringHomepageBannerLeftLinkText: cateringHomepageBannerState.leftLinkText,
								updateCateringHomepageBannerLeftLink: cateringHomepageBannerState.leftLink,
								updateCateringHomepageBannerRightLinkText: cateringHomepageBannerState.rightLinkText,
								updateCateringHomepageBannerRightLink: cateringHomepageBannerState.rightLink,
								updateCateringHomepageBannerImages: cateringHomepageBannerState.images,
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
