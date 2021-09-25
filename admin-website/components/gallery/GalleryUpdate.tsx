import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import GalleryCard from "./GalleryCard";

interface GalleryData {
	galleryImages: {
		image: string;
		description: string;
		id: string;
	}[];
}

export default function GalleryUpdate() {
	// get all of the current gallery items
	const GET_GALLERY_IMAGES = gql`
		query Query {
			galleryImages {
				image
				description
				id
			}
		}
	`;
	const { loading, error, data } = useQuery<GalleryData>(GET_GALLERY_IMAGES);

	if (loading) return <div>loading</div>;
	if (error) return <div>error: {error.message}</div>;

	return (
		<div>
			<div className="text-primary font-bold text-center text-2xl">Update</div>
			<div className="grid grid-cols-3 gap-x-5">
				{data &&
					data.galleryImages.map((item) => {
						return (
							<GalleryCard
								image={item.image}
								description={item.description}
								id={item.id}
								key={item.id}
							/>
						);
					})}
			</div>
		</div>
	);
}
