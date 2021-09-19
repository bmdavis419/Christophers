import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface propsInterface {
    restaurantInfo: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
        phone: string;
        location: string;
        locationLink: string;
    }
};

export default function RestaurantInfo(props: propsInterface) {

    const { restaurantInfo } = props;
    const [restaurantInfoState, setRestaurantInfoState] = useState(restaurantInfo);
    const [canUpdate, setCanUpdate] = useState(false);

    const [updateRestarauntInfo, { loading, error }] = useMutation(gql`
    mutation Mutation($updateRestaurantInfoMonday: String, $updateRestaurantInfoTuesday: String, $updateRestaurantInfoWednesday: String, $updateRestaurantInfoThursday: String, $updateRestaurantInfoFriday: String, $updateRestaurantInfoSaturday: String, $updateRestaurantInfoSunday: String, $updateRestaurantInfoPhone: String, $updateRestaurantInfoLocation: String, $updateRestaurantInfoLocationLink: String) {
        updateRestaurantInfo(monday: $updateRestaurantInfoMonday, tuesday: $updateRestaurantInfoTuesday, wednesday: $updateRestaurantInfoWednesday, thursday: $updateRestaurantInfoThursday, friday: $updateRestaurantInfoFriday, saturday: $updateRestaurantInfoSaturday, sunday: $updateRestaurantInfoSunday, phone: $updateRestaurantInfoPhone, location: $updateRestaurantInfoLocation, locationLink: $updateRestaurantInfoLocationLink) {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
          phone
          location
          locationLink
        }
      }
    `);

    return (
        <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
			<div>
				<input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.monday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, monday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.tuesday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, tuesday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.wednesday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, wednesday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.thursday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, thursday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.friday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, friday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.saturday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, saturday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.sunday}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, sunday: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.phone}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, phone: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.location}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, location: e.target.value });
					}}
				/>
                <input
					type="text"
					className="bg-gray-300 px-3 py-3 rouned-lg"
					value={restaurantInfoState.locationLink}
					onChange={(e) => {
						e.preventDefault();
						setCanUpdate(true);
						setRestaurantInfoState({ ...restaurantInfoState, sunday: e.target.value });
					}}
				/>
                
				<button
					className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
					disabled={!canUpdate}
					onClick={(e) => {
						setCanUpdate(false);

						updateRestarauntInfo({
							variables: {
								updateRestarauntInfoMonday: restaurantInfoState.monday,
								updateRestarauntInfoTuesday: restaurantInfoState.tuesday,
								updateRestarauntInfoWednesday: restaurantInfoState.wednesday,
								updateRestarauntInfoThursday: restaurantInfoState.thursday,
								updateRestarauntInfoFriday: restaurantInfoState.friday,
								updateRestarauntInfoSaturday: restaurantInfoState.saturday,
								updateRestarauntInfoSunday: restaurantInfoState.sunday,
								updateRestarauntInfoPhone: restaurantInfoState.phone,
								updateRestarauntInfoLocation: restaurantInfoState.location,
								updateRestarauntInfoLocationLink: restaurantInfoState.locationLink,
							},
                        });
					}}
				>
					{loading ? "...loading" : "Update"}
				</button>
			</div>
		</div>
    )
}
