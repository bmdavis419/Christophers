import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import React, { useState } from "react";
import MenuHeader from "../components/menu/MenuHeader";
import MenuFeatures from "../components/menu/MenuFeatures";
import MenuDropdownMenu from "../components/menu/MenuDropdownMenu";
import MenuBox from "../components/menu/MenuBox";
interface PropsInterface {
	features: [
		{
			id: string;
			type: string;
			menuItem: [
				{
					name: string;
					id: string;
					description: string;
					price: number;
					image: string;
					type: number; //0 both - 1 Dine-in - 2 Carryout
				}
			];
		}
	];
	categories: [
		{
			name: string;
			subcategories: [
				{
					name: string;
					id: string;
				}
			];
		}
	];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
			{
				categories {
					subcategories {
						id
						name
					}
					name
				}
			}
		`,
	});

	const { data: featuresData } = await client.query({
		query: gql`
			{
				features {
					type
					id
					menuItem {
						name
						id
						description
						price
						image
						type
					}
				}
			}
		`,
	});

	return {
		props: {
			categories: data.categories,
			features: featuresData.features,
		},
	};
};

export default function menu(props: PropsInterface) {
	const { categories, features } = props;
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(categories[0].subcategories[0].id);
	const [name, setName] = useState(categories[0].subcategories[0].name);

	function setActiveFeature(e: HTMLFormElement, i: number) {
		e.preventDefault();
		setIndex(i);
	}
	function setActiveId(e: HTMLFormElement, id: string) {
		e.preventDefault();
		setId(id);
		for (let cat of categories) {
			for (let sub of cat.subcategories) {
				if (sub.id === id) {
					setName(sub.name);
				}
			}
		}
	}

	console.log(features);
	return (
		<div className="md:mt-16 flex flex-col items-center justify-center">
			<div className=" w-full md:w-4/5">
				{/* <MenuHeader /> */}
				{features && (
					<MenuFeatures
						numFeatures={features.length}
						activeFeature={index}
						Feature={features[index]}
						setActiveFeature={setActiveFeature}
						key={features[index].id}
					/>
				)}
			</div>
			<div className=" lg:mx-12 md:mt-16 flex flex-col md:flex-row flex-grow-0">
				<MenuDropdownMenu
					categories={categories}
					setActiveId={setActiveId}
					activeId={id}
				/>
				<MenuBox id={id} name={name} />
			</div>
		</div>
	);
}
