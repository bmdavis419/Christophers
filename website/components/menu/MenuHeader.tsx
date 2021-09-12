import React from "react";
import Image from "next/image";
import menuHeaderImg from "/LogoRes.jpg";

export default function menuHeader() {
	return (
		<div className="flex flex-col justify-evenly items-center relative w-full h-72 overflow-hidden drop-shadow-xl bg-black bg-opacity-60 md:rounded-50px">
			<Image
				className="mix-blend-darken"
				objectFit="cover"
				layout="fill"
				src="https://firebasestorage.googleapis.com/v0/b/christophers-321318.appspot.com/o/logos%2FLogoRes.jpg?alt=media&token=151e8457-84a8-4127-bd16-e1406ce2ab21"
				alt="Menu Header Background Image"
			/>
			<h1 className="relative mix-blend-normal text-white text-3xl md:text-6xl text-center mx-auto">
				Something for<br></br> Everyone...
			</h1>
			<div className="relative mix-blend-normal flex flex-col md:flex-row w-full">
				<a href="menu">
				<div className=" bg-primary text-white rounded-50px mt-4 px-6 py-2 md:px-12 md:py-6 w-40 lg:w-80  text-center mx-auto">
					Breakfast
				</div>
				</a>
				<div className=" bg-primary text-white rounded-50px mt-4 px-6 py-2 md:px-12 md:py-6 w-40 lg:w-80  text-center mx-auto">
					Lunch
				</div>
				<div className=" bg-primary  text-white rounded-50px mt-4 w-40 lg:w-80 text-center mx-auto px-6 py-2 md:px-12 md:py-6">
					Dinner
				</div>
			</div>
		</div>
	);
}
