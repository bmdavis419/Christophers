import { GetServerSideProps } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import React, { useState } from "react";
import MenuDropdownMenu from "../components/menu/MenuDropdownMenu";
import MenuBox from "../components/menu/MenuBox";
import Header from "../components/layout/header";
interface PropsInterface {
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

	return {
		props: {
			categories: data.categories,
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
			<Header />
			<div className="overflow-x-hidden m-0 md:mt-16 flex flex-col items-center justify-center">
				<div className=" w-full md:w-auto mx-0 lg:mx-12 md:mt-4 flex flex-col md:flex-row flex-grow-0">
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
