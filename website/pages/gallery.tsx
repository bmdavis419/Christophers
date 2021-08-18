import React, { useState } from "react";
import { GetServerSideProps } from "next";
import GalleryImage from "../components/gallery/GalleryImage";
import pic1 from "../components/gallery/fakeImages/pic1.jpeg";

interface PropsInterface {
	images: [
		{
			image: string;
		}
	];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			images: [
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
				{ image: pic1.src },
			],
		},
	};
};

export default function gallery(props: PropsInterface) {
	const { images } = props;
	const sortedImages = [];
	for (let i: number = 0; i < images.length; i += 4) {
		sortedImages.push(images.slice(i, i + 4));
	}
	const [index, setIndex] = useState(0);

	let circles: any = [];
	for (let i: number = 0; i < sortedImages.length; i++) {
		circles.push(
			<div
				onClick={() => {
					setIndex(i);
				}}
				className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${
					index == i ? "primary" : "gray-400"
				}`}
			></div>
		);
	}
	return (
		<div className="flex flex-col">
			<div className="text-headlg text-primary text-center mb-6">Gallery</div>
			<div className="grid grid-flow-row lg:grid-cols-2 md:grid-cols-1 sm:grid-rows-2 sm:grid-cols-1 gap-6 md:gap-130 justify-items-center filter drop-shadow-gallery">
				{sortedImages[index].map((el, i) => {
					return <GalleryImage pic={el.image} index={i} />;
				})}
			</div>
			<div className="relative mix-blend normal flex flex-row self-end mx-auto mt-6">
				{circles}
			</div>
		</div>
	);
}
