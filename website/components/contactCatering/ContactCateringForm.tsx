import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

export default function ContactForm() {
	const [buttonColor, setButtonColor] = useState("primary");

	const { data, loading, error } = useQuery(gql`
		query ExampleQuery {
			services {
				name
				id
			}
			venues {
				name
				id
			}
		}
	`);

	// mutation to send to DB
	const [addContact, { loading: loadingAdd, error: errorAdd }] =
		useMutation(gql`
			mutation AddCateringContact(
				$firstName: String
				$lastName: String
				$email: String
				$methodOfContact: String
				$phone: String
				$dateOfEvent: String
				$venue: ID
				$guests: Int
				$service: ID
				$info: String
				$date: String
			) {
				addCateringContact(
					firstName: $firstName
					lastName: $lastName
					email: $email
					methodOfContact: $methodOfContact
					phone: $phone
					dateOfEvent: $dateOfEvent
					venue: $venue
					guests: $guests
					service: $service
					info: $info
					date: $date
				) {
					id
				}
			}
		`);

	const [venues, setVenues] = useState<{ name: string; id: string }[]>([]);
	const [services, setServices] = useState<{ name: string; id: string }[]>([]);

	useEffect(() => {
		if (data && data.services) {
			setServices([...data.services]);
			console.log(data.services);
		}
		if (data && data.venues) {
			setVenues([...data.venues]);
		}
	}, [data]);

	const sendMessage = async (event: any) => {
		event.preventDefault();
		const email = {
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			email: event.target.email.value,
			phone: event.target.phone.value,
			methodOfContact: event.target.contactMethod.value,
			dateOfEvent: event.target.date.value,
			date: new Date().toString(),
			guests: parseInt(event.target.guests.value),
			venue: event.target.venue.value,
			service: event.target.service.value,
			info: event.target.additionalInfo.value,
		};
		console.log(email);

		addContact({ variables: { ...email } });

		setButtonColor("green");
		setTimeout(() => {
			setButtonColor("primary");
		}, 2000);
		alert(
			"Thank you for contacting us, we will get back with you as soon as we can!"
		);
		event.target.reset();
	};

	return (
		<form onSubmit={sendMessage} className="w-full max-w- mb-8">
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
					{venues.map((i, idx) => (
						<div className="mt-1" key={idx}>
							<input
								type="radio"
								id={i.id}
								name="venue"
								className="m-1"
								value={i.id}
							/>
							<label htmlFor={i.id}>{i.name}</label>
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
					{services.map((i, idx) => (
						<div className="mt-1" key={idx}>
							<input
								type="radio"
								id={i.id}
								name="service"
								className="m-1"
								value={i.id}
							/>
							<label htmlFor={i.id}>{i.name}</label>
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
				className={`bg-${buttonColor} text-white py-2 px-4 mx-2 rounded-full hover:bg-secondary`}
			>
				Send
			</button>
		</form>
	);
}
