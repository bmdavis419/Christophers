import React from "react";
import Image from "next/image";

export default function MenuItem(props: PropsInterface) {
	const { name, description, price, image, type } = props.menuItem;
	return (
		<div className="mx-auto w-36 h-48 md:w-72 md:h-96 filter drop-shadow-2xl rounded-2xl flex flex-col overflow-hidden items-center bg-gray-100">
			<div className="hover:bg-black group hover:bg-opacity-60 relative w-36 h-36 md:w-72 md:h-72">
				<Image
					className="mix-blend-multiply"
					objectFit="fill"
					layout="fill"
					src={image}
					alt={name}
				/>
				<div className="md:mx-8 text-sm md:text-lg mt-6 md:mt-12 text-center absolute opacity-0 md:group-hover:opacity-100 w-36 h-36 md:w-60 md:h-60 top-2 text-white">
					{description}
				</div>
			</div>
			<div className="absolute w-14 h-5 md:w-28 md:h-10 rounded-full bg-secondary top-2 text-sm md:text-lg left-2 text-white text-center ">
				<p className="md:mt-1.5">
					{type == 1 ? "Dine-in" : type == 0 ? "Both" : "Carryout"}
				</p>
			</div>
			<h1
				className={`text-center m-1 text-sm md:${
					name.length >= 20
						? name.length >= 30
							? "text-md"
							: "text-lg"
						: "text-2xl"
				}`}
			>
				{name}
			</h1>

			<a
				className="rounded-full w-4/5 md:w-1/2 py-2 text-sm md:text-lg bg-primary text-white hover:bg-secondary text-center"
				href="https://www.toasttab.com/christophers-restaurant-2318-e-dorothy-lane/v3"
			>
				Order{price !== "" && ` - $${price}`}
			</a>
		</div>
	);
}

interface PropsInterface {
	menuItem: {
		name: string;
		id: string;
		description: string;
		price: string;
		image: string;
		type: number; //0 both - 1 Dine-in - 2 Carryout
	};
}
