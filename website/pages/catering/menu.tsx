import { GetServerSideProps } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import React, { useState } from "react";
import MenuDropdownMenu from "../../components/menu/MenuDropdownMenu";
import CateringHeader from "../../components/layout/cateringHeader";
import CateringMenuBox from "../../components/cateringMenu/CateringMenuBox";
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
				cateringCategories {
					subcategories {
						id
						name
					}
					name
				}
			}
		`,
	});

	return {
		props: {
			categories: data.cateringCategories,
		},
	};
};

export default function Menu(props: PropsInterface) {
	const { categories } = props;
	const [id, setId] = useState(categories[0].subcategories[0].id);
	const [name, setName] = useState(categories[0].subcategories[0].name);

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
				<title>Christopher&apos;s Restaurant Menu</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CateringHeader />
			<div className="md:mt-16 flex flex-col items-center justify-center">
				<div className=" lg:mx-12 md:mt-16 flex flex-col md:flex-row flex-grow-0">
					<MenuDropdownMenu
						categories={categories}
						setActiveId={setActiveId}
						activeId={id}
					/>
					<CateringMenuBox id={id} name={name} />
				</div>
			</div>
		</>
	);
}
