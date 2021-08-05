import React from "react";
import { useAuth } from "reactfire";

interface PropsInterface {
	setPageIndex: Function;
}

export default function Nav(props: PropsInterface) {
	const auth = useAuth();

	// logout
	const logoutEvent = (e: any) => {
		e.preventDefault();
		auth.signOut();
	};

	const { setPageIndex } = props;

	return (
		<div className=" md:min-h-screen md:w-1/6 bg-primary">
			<div className="w-full">
				<div className="flex justify-center mb-5 bg-white bg-opacity-50 py-2">
					<h1 className="text-center text-2xl text-white font-bold px-3">
						Christopher's Admin
					</h1>
				</div>
				<div className="flex justify-center">
					<ul className="text-center">
						<li
							className="navItem"
							onClick={() => {
								setPageIndex(0);
							}}
						>
							<svg
								className="w-6 h-6 inline mr-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							Homepage
						</li>
						<li
							className="navItem"
							onClick={() => {
								setPageIndex(1);
							}}
						>
							<svg
								className="w-6 h-6 inline mr-3"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							About
						</li>
						<li
							className="navItem"
							onClick={() => {
								setPageIndex(2);
							}}
						>
							<svg
								className="w-6 h-6 inline mr-3"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							Menu
						</li>
						<li
							className="navItem"
							onClick={() => {
								setPageIndex(3);
							}}
						>
							<svg
								className="w-6 h-6 inline mr-3"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
							</svg>
							Catering Home
						</li>
						<li className="navItem" onClick={logoutEvent}>
							<svg
								className="w-6 h-6 inline mr-3"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
									clipRule="evenodd"
								/>
							</svg>
							Logout
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
