import React, { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export default function Header() {
	// get the site state
	const { data } = useQuery(gql`
		{
			siteControls {
				siteAlert
				showResGallery
			}
		}
	`);

	const [navigation, setNavigation] = useState([
		{ name: "About", href: "/about" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Contact", href: "/contact" },
		{ name: "Features", href: "/Features" },
		{ name: "Menu", href: "/menu" },
		{ name: "Catering", href: "/catering" },
	]);

	useEffect(() => {
		if (data) {
			if (data.siteControls.showVenues && data.siteControls.showPartners) {
				const tempNav = [...navigation];
				tempNav.push({ name: "Gallery", href: "/gallery" });
				setNavigation([...tempNav]);
			}
		}
	}, [data]);

	return (
		<>
			<Disclosure as="nav">
				{({ open }) => (
					<>
						<div className="relative flex items-center justify-center h-24">
							<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center p-2">
									{open ? (
										<XIcon className="block h-6 w-6" />
									) : (
										<MenuIcon className="block h-6 w-6" />
									)}
								</Disclosure.Button>
							</div>
							<div className="justify-center md:pl-24">
								<Link href="/">
									<a>
										<Image
											alt="logo"
											src="/logos/LogoRes.jpg"
											width={300}
											height={60}
											className="justify-center md:justify-start h-20 w-72 bg-black"
										></Image>
									</a>
								</Link>
							</div>
							<div className="self-center ml-auto mr-24 text-black md:flex justify-end space-x-8 text-2xl lg:text-3xl hidden ">
								{navigation.map((item) => (
									<Link href={item.href} key={item.name}>
										<a className="hover:text-primary">{item.name}</a>
									</Link>
								))}
							</div>
						</div>
						<Transition
							show={open}
							enter="transition ease-in-out duration-700 transform"
							enterFrom="-translate-x-full scale-95"
							enterTo="translate-x-0 scale-100"
							leave="transition ease-in-out duration-500 transform"
							leaveFrom="translate-x-0 scale-95"
							leaveTo="-translate-x-full scale-100"
						>
							<Disclosure.Panel className="absolute z-10 bg-white w-screen md:hidden">
								<div className="px-2 pt-2 pb-3 space-y-2 flex flex-col text-2xl">
									{navigation.map((item) => (
										<Link href={item.href} key={item.name}>
											<a key={item.name}>{item.name}</a>
										</Link>
									))}
								</div>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
			<div className="w-full text-white font-bold text-center bg-primary text-xl">
				{data && data.siteControls.siteAlert}
			</div>
		</>
	);
}
