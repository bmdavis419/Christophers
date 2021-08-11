import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<nav>
			<div className="flex flex-row justify-start">
				<div className="flex flex-row justify-start pl-24 pt-4">
					<Link href="/">
						<a>
							<Image
								src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
								width={296}
								height={70}
							/>
						</a>
					</Link>
				</div>
				<div className="self-center ml-auto mr-12 text-black flex justify-end space-x-8 text-3xl">
					<Link href="/about">About</Link>
					<Link href="/">Contact</Link>
					<Link href="/menu">Menu</Link>
					<Link href="/">Catering</Link>
				</div>
			</div>
		</nav>
	);
}
