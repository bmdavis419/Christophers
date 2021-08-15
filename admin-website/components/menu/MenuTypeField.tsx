import React from "react";

interface PropsInterface {
	type: any;
	setType: Function;
}

export default function MenuTypeField(props: PropsInterface) {
	const { type, setType } = props;
	return (
		<div className="mb-3 w-full flex justify-between px-10">
			<button
				className={
					type.type == 1
						? "rounded-full bg-primary text-white font-bold px-3 py-2"
						: "rounded-full bg-secondary text-white font-bold px-3 py-2"
				}
				onClick={(e) => {
					e.preventDefault();
					setType({ ...type, type: 1 });
				}}
			>
				Dine-In
			</button>
			<button
				className={
					type.type == 2
						? "rounded-full bg-primary text-white font-bold px-3 py-2"
						: "rounded-full bg-secondary text-white font-bold px-3 py-2"
				}
				onClick={(e) => {
					e.preventDefault();
					setType({ ...type, type: 2 });
				}}
			>
				Carry Out
			</button>
			<button
				className={
					type.type == 0
						? "rounded-full bg-primary text-white font-bold px-3 py-2"
						: "rounded-full bg-secondary text-white font-bold px-3 py-2"
				}
				onClick={(e) => {
					e.preventDefault();
					setType({ ...type, type: 0 });
				}}
			>
				Both
			</button>
		</div>
	);
}
