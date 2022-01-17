import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface ContactInterface {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	subject: string;
	message: string;
	date: string;
	archived: boolean;
}

export default function ResContact() {
	const { data, loading } = useQuery(gql`
		query ResContact {
			resContact {
				id
				firstName
				lastName
				email
				subject
				message
				date
				archived
			}
		}
	`);

	const [contacts, setContacts] = useState<ContactInterface[]>([]);

	useEffect(() => {
		if (data) {
			setContacts([...data.resContact]);
		}
	}, [data]);

	if (loading) return <div>Loading</div>;

	return (
		<div className="w-full">
			<div className="text-center text-primary font-bold text-xl">
				Contact Logs for Restaurant
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
							<ContactTextField name="Subject" value={contact.subject} />
							<ContactTextField name="Message" value={contact.message} />
							<ContactTextField name="Date" value={contact.date} />
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
