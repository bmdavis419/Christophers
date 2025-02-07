import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PropsInterface {
	homepageBanner: {
		topText: string;
		midText: string;
		bottomText: string;
		leftLinkText: string;
		leftLink: string;
		rightLinkText: string;
		rightLink: string;
		images: [string];
	};
}

export default function IndexHeader(props: PropsInterface) {
	const { homepageBanner } = props;
	//Timer in react
	const [i, setI] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			if (homepageBanner.images) {
				setI(i >= homepageBanner.images.length - 1 ? 0 : i + 1);
			}
		}, 5000);
		return () => clearInterval(interval);
	});

	return (
		<div className="flex flex-col justify-evenly items-center relative w-full p-12 h-3/4vw sm:h-1/2vw lg:h-1/3vw overflow-hidden drop-shadow-xl bg-black bg-opacity-60 ">
			<Image
				className="mix-blend-multiply"
				objectFit="cover"
				layout="fill"
				src={homepageBanner.images ? homepageBanner.images[i] : "default.jpg"}
				alt="Index Header Background Image"
			/>
			<h1 className="relative mix-blend-normal text-white text-xl md:text-5xl xl:text-6xl text-center mx-auto font-bold">
				Christopher&apos;s Restaurant{" "}
				<span className="block">and Catering</span>
			</h1>
			<h1 className="relative mix-blend-normal text-white text-lg md:text-2xl xl:text-3xl text-center mx-auto w-11/12">
				{homepageBanner.midText}
			</h1>
			<div className="relative mix-blend-normal justify-center flex flex-col md:flex-row w-full">
				{/*Regex expression is used to check if the button text is empty, if it is the button doens't appear */}

				<a
					className={`hover:bg-secondary hover:shadow-lg rounded-full m-2 max-w-full mx-auto md:mx-8 py-2 px-5 text-white text-xl bg-primary ${
						/\S/.test(homepageBanner.leftLinkText) ? "block" : "hidden"
					}`}
					href={homepageBanner.leftLink}
					target="_blank"
					rel="noreferrer"
				>
					{" "}
					{homepageBanner.leftLinkText}
				</a>
				<a
					className={`hover:bg-secondary hover:shadow-lg rounded-full m-2 max-w-full mx-auto md:mx-8 py-2 px-5 text-white text-xl bg-primary ${
						/\S/.test(homepageBanner.rightLinkText) ? "block" : "hidden"
					}`}
					href={homepageBanner.rightLink}
					target="_blank"
					rel="noreferrer"
				>
					{homepageBanner.rightLinkText}
				</a>
			</div>
			<div className="relative mix-blend-normal text-white text-xl md:text-3xl xl:text-5xl text-center mx-auto">
				{homepageBanner.bottomText}
			</div>
		</div>
	);
}
