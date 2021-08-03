import React from "react";
import { useAuth } from "reactfire";

export default function Dashboard() {
	const auth = useAuth();
	return (
		<div>
			Dashboard
			<button
				onClick={(e) => {
					e.preventDefault();
					auth.signOut();
				}}
			>
				Logout
			</button>
		</div>
	);
}
