import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface ContactInterface {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	methodOfContact: string;
	info: string;
	date: string;
	archived: boolean;
	guests: number;
	venue: {
		name: string;
		id: string;
	};
	service: {
		name: string;
		id: string;
	};
	dateOfEvent: string;
}

export default function CateringContact() {
	const { data, loading } = useQuery(gql`
		query ResContact {
			cateringContact {
				id
				firstName
				lastName
				email
				phone
				methodOfContact
				dateOfEvent
				guests
				venue {
					name
					id
				}
				service {
					name
					id
				}
				info
				date
				archived
			}
		}
	`);

	const [contacts, setContacts] = useState<ContactInterface[]>([]);

	useEffect(() => {
		if (data) {
			setContacts([...data.cateringContact]);
		}
	}, [data]);

	if (loading) return <div>Loading</div>;

	return (
		<div className="w-full">
			<div className="text-center text-primary font-bold text-xl">
				Contact Logs for Catering
			</div>
			{contacts &&
				contacts.map((contact) => {
					return (
						<div
							key={contact.id}
							className="w-full mx-6 rounded-lg shadow-lg my-3 p-5"
						>
							<ContactTextField name="First Name" value={contact.firstName} />
							<ContactTextField name="Last Name" value={contact.lastName} />
							<ContactTextField name="Email" value={contact.email} />
							<ContactTextField name="Phone" value={contact.phone} />
							<ContactTextField
								name="Date of Event"
								value={contact.dateOfEvent}
							/>
							<ContactTextField name="Date Sent" value={contact.date} />
							<ContactTextField name="Information" value={contact.info} />
							<ContactTextField name="Venue" value={contact.venue.name} />
							<ContactTextField name="Service" value={contact.service.name} />
							<ContactTextField
								name="Guests"
								value={contact.guests.toString()}
							/>
						</div>
					);
				})}
		</div>
	);
}

function ContactTextField(props: { name: string; value: string }) {
	const { name, value } = props;
	return (
		<div>
			<span>{name}: </span>
			{value}
		</div>
	);
}
