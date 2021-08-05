import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Image from 'next/image'

export default function MenuItem(props: PropsInterface) {
	const {name, id, description, price, image, type} = props.menuItem
	console.log(props);
	return (
		<div className="w-72 h-96 filter drop-shadow-2xl rounded-2xl flex flex-col overflow-hidden items-center bg-gray-100">
			<div className="hover:bg-black group hover:bg-opacity-60 relative w-72 h-72"><Image className="mix-blend-darken" objectFit="fill" layout="fill" src="/LogoRes.jpg" alt={name}/>
			<div className="mx-8 mt-12 text-center absolute opacity-0 group-hover:opacity-100 w-60 h-60 top-2 text-white">{description}</div>
			</div>
			<div className="absolute w-28 h-10 rounded-full bg-secondary top-2 left-2 text-white text-center "><p className="mt-1.5">{type == 0 ? "Both" : type == 1 ? "Dine-in" : "Carryout"}</p></div>
			<h1 className={`text-center m-1 ${ name.length >= 20? name.length >= 30? "text-md": "text-lg" : "text-2xl" }`}>{name}</h1>
			<button className="rounded-full w-1/2 py-2 bg-primary text-white">Order - ${price}</button>
		</div>
	)
}

interface PropsInterface {
			menuItem: {
				name:string,
				id: string,
				description:string,
				price:number,
				image:string,
				type:number, //0 both - 1 Dine-in - 2 Carryout
			}
}
