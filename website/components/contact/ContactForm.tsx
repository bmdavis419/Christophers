import React, { useState } from "react";
export default function ContactForm() {
	const [buttonColor, setButtonColor] = useState("primary");

	const sendMessage = async (event: any) => {
		event.preventDefault();
		const email = {
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			email: event.target.email.value,
			subject: event.target.subject.value,
			message: event.target.message.value,
		};
		console.log(email);
		setButtonColor("green");
		setTimeout(() => {
			setButtonColor("primary");
		}, 2000);
		event.target.reset();
	};

	return (
		<form onSubmit={sendMessage} className="w-full max-w-lg mb-8">
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="firstName"
					>
						First Name
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="firstName"
						type="text"
						placeholder="John"
					></input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="lastName"
					>
						Last Name
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="lastName"
						type="text"
						placeholder="Doe"
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="email"
						type="email"
						placeholder="something@gmail.com"
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="subject"
					>
						Subject
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 bordertext-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="subject"
						type="text"
						placeholder="The Subject"
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full px-3">
					<label
						htmlFor="message"
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					>
						Message
					</label>
					<textarea
						required
						name=""
						id="message"
						cols={30}
						rows={10}
						className="bg-gray-200 w-full py-3 px-4 focus:bg-white rounded border border-gray-300"
						placeholder="The Message"
					></textarea>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<button
					type="submit"
					className={`bg-${buttonColor} text-white py-2 px-4 mx-2 rounded-full`}
				>
					Send Message
				</button>
			</div>
		</form>
	);
}
