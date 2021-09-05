import { GetServerSideProps } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import React, { useState } from "react";
import MenuFeatures from "../components/menu/MenuFeatures";
import MenuDropdownMenu from "../components/menu/MenuDropdownMenu";
import MenuBox from "../components/menu/MenuBox";
import Header from "../components/layout/header";
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

	return (
		<>
			<Head>
				<title>Christopher's Restaurant Menu</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div className="md:mt-16 flex flex-col items-center justify-center">
				<div className=" w-full md:w-3/5">
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
		</>
	);
}
