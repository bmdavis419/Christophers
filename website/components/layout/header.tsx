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
								src="https://firebasestorage.googleapis.com/v0/b/christophers-321318.appspot.com/o/logos%2FLogoRes.jpg?alt=media&token=151e8457-84a8-4127-bd16-e1406ce2ab21"
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
