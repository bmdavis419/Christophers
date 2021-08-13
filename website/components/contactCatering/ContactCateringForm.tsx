import React, { useState } from "react";

export default function ContactForm() {
	const [buttonColor, setButtonColor] = useState("primary");

	//These arrays will be replaced by props eventually
	let Venue = ["Venue1", "Venue2", "Venue3"];
	let Service = ["Service1", "Service2", "Service3"];

	const sendMessage = async (event: any) => {
		event.preventDefault();
		const email = {
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			email: event.target.email.value,
			phone: event.target.phone.value,
			contactMethod: event.target.contactMethod.value,
			date: event.target.date.value,
			guests: event.target.guests.value,
			venue: event.target.venue.value,
			service: event.target.service.value,
			additionalInfo: event.target.additionalInfo.value,
		};
		console.log(email);
		setButtonColor("green");
		setTimeout(() => {
			setButtonColor("primary");
		}, 2000);
		event.target.reset();
	};

	return (
		<form onSubmit={sendMessage} className="w-full max-w-lg">
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
						htmlFor="phone"
					>
						phone
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 bordertext-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="phone"
						type="tel"
						placeholder="The phone"
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full px-3">
					<label
						htmlFor="contactMethod"
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					>
						preferred Method of contact
					</label>
					<input
						required
						name=""
						id="contactMethod"
						className="bg-gray-200 w-full py-3 px-4 focus:bg-white rounded border border-gray-300"
						placeholder="Phone, Email, etc."
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="date"
					>
						Date of Event
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="date"
						type="date"
						placeholder="01/01/2000"
					></input>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="guests"
					>
						Expected # of Guests
					</label>
					<input
						required
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="guests"
						type="number"
						placeholder="99"
					></input>
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor=""
					>
						Preferred Venue
					</label>
					{Venue.map((i) => (
						<div className="mt-1">
							<input type="radio" id={i} name="venue" className="m-1" />
							<label htmlFor={i}>{i}</label>
						</div>
					))}
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor=""
					>
						Type of Service
					</label>
					{Service.map((i) => (
						<div className="mt-1">
							<input type="radio" id={i} name="service" className="m-1" />
							<label htmlFor={i}>{i}</label>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-wrap mx-3 mb-4">
				<div className="w-full px-3">
					<label
						htmlFor="additionalInfo"
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					>
						Additional Info
					</label>
					<textarea
						name=""
						id="additionalInfo"
						cols={30}
						rows={5}
						className="bg-gray-200 w-full py-3 px-4 focus:bg-white rounded border border-gray-300"
						placeholder="Special considerations..."
					></textarea>
				</div>
			</div>
			<button
				type="submit"
				className={`bg-${buttonColor} text-white py-2 px-4 mx-2 rounded-full`}
			>
				Send Message
			</button>
		</form>
	);
}
