import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "reactfire";

export default function Login() {
	// manage state
	const [info, setInfo] = useState({
		email: "",
		password: "",
	});
	const [errorMsg, setErrorMsg] = useState("");

	// handle the login event
	const auth = useAuth();
	const loginEvent = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(info.email, info.password)
			.catch((error) => {
				setErrorMsg(`Error: ${error.message}`);
			});
	};

	return (
		<div className="flex justify-center w-full">
			<div>
				<div className="shadow-md rounded-xl px-6 py-3 mt-10">
					<div className="text-primary text-center text-3xl font-bold mb-3">
						Christopher's Administration
					</div>
					<div className="text-primary font-extrabold mb-3 text-center underline">
						{errorMsg}
					</div>
					<form onSubmit={loginEvent}>
						<div className="mb-3">
							<label htmlFor="email" className="formLabel">
								email
							</label>
							<input
								type="text"
								name="email"
								id="email"
								className="formTextBox w-full"
								onChange={(e) => {
									e.preventDefault();
									setInfo({ ...info, email: e.target.value });
								}}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="formLabel">
								password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="formTextBox w-full"
								onChange={(e) => {
									e.preventDefault();
									setInfo({ ...info, password: e.target.value });
								}}
							/>
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								className="rounded-full bg-primary text-white px-3 py-2 text-lg hover:bg-secondary"
							>
								login
							</button>
						</div>
					</form>
				</div>
				<a className="block text-center mt-3 font-light hover:text-primary hover:underline">
					<Link href="https://christophers.biz">Main Site</Link>
				</a>
			</div>
		</div>
	);
}
