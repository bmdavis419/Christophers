import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface PropsInterface {
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
  };
}

export default function RestaurantInfo(props: PropsInterface) {
  const { restaurantInfo } = props;
  const [restaurantInfoState, setRestaurantInfoState] =
    useState(restaurantInfo);
  const [canUpdate, setCanUpdate] = useState(false);

  const [updateRestaurantInfo, { loading }] = useMutation(gql`
    mutation Mutation(
      $updateRestaurantInfoSunday: String
      $updateRestaurantInfoMonday: String
      $updateRestaurantInfoTuesday: String
      $updateRestaurantInfoWednesday: String
      $updateRestaurantInfoThursday: String
      $updateRestaurantInfoFriday: String
      $updateRestaurantInfoSaturday: String
      $updateRestaurantInfoPhone: String
      $updateRestaurantInfoLocationLink: String
      $updateRestaurantInfoLocation: String
    ) {
      updateRestaurantInfo(
        sunday: $updateRestaurantInfoSunday
        monday: $updateRestaurantInfoMonday
        tuesday: $updateRestaurantInfoTuesday
        wednesday: $updateRestaurantInfoWednesday
        thursday: $updateRestaurantInfoThursday
        friday: $updateRestaurantInfoFriday
        saturday: $updateRestaurantInfoSaturday
        phone: $updateRestaurantInfoPhone
        locationLink: $updateRestaurantInfoLocationLink
        location: $updateRestaurantInfoLocation
      ) {
        sunday
        tuesday
        monday
        wednesday
        thursday
        friday
        saturday
        phone
        location
        locationLink
      }
    }
  `);

  return (
    <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
      <div className="grid grid-cols-5 gap-4 ">
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="mondayHours"
          >
            Monday Hours
          </label>
          <input
            id="mondayHours"
            type="text"
            placeholder="Monday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.monday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                monday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="tuesdayHours"
          >
            Tuesday Hours
          </label>
          <input
            id="tuesdayHours"
            type="text"
            placeholder="Wednesday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.tuesday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                tuesday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="wednesdayHours"
          >
            Wednesday Hours
          </label>
          <input
            id="wednesdayHours"
            type="text"
            placeholder="Wednesday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.wednesday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                wednesday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="thursdayHours"
          >
            Thursday Hours
          </label>
          <input
            id="thursdayHours"
            type="text"
            placeholder="Thursday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.thursday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                thursday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="fridayHours"
          >
            Friday Hours
          </label>
          <input
            id="fridayHours"
            type="text"
            placeholder="Friday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.friday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                friday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="saturdayHours"
          >
            Saturday Hours
          </label>
          <input
            id="saturdayHours"
            type="text"
            placeholder="Saturday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.saturday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                saturday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="sundayHours"
          >
            Sunday Hours
          </label>
          <input
            id="sundayHours"
            type="text"
            placeholder="Sunday Hours"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.sunday}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                sunday: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Phone"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.phone}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                phone: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="locationHours"
          >
            Location
          </label>
          <input
            id="locationHours"
            type="text"
            placeholder="Location"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.location}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                location: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="locationlink"
          >
            Location Link
          </label>
          <input
            id="locationlink"
            type="text"
            placeholder="Location Link"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantInfoState.locationLink}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantInfoState({
                ...restaurantInfoState,
                locationLink: e.target.value,
              });
            }}
          />
        </div>

        <button
          className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          disabled={!canUpdate}
          onClick={(e) => {
            setCanUpdate(false);

            updateRestaurantInfo({
              variables: {
                updateRestaurantInfoMonday: restaurantInfoState.monday,
                updateRestaurantInfoTuesday: restaurantInfoState.tuesday,
                updateRestaurantInfoWednesday: restaurantInfoState.wednesday,
                updateRestaurantInfoThursday: restaurantInfoState.thursday,
                updateRestaurantInfoFriday: restaurantInfoState.friday,
                updateRestaurantInfoSaturday: restaurantInfoState.saturday,
                updateRestaurantInfoSunday: restaurantInfoState.sunday,
                updateRestaurantInfoPhone: restaurantInfoState.phone,
                updateRestaurantInfoLocation: restaurantInfoState.location,
                updateRestaurantInfoLocationLink:
                  restaurantInfoState.locationLink,
              },
            });
          }}
        >
          {loading ? "...loading" : "Update"}
        </button>
      </div>
    </div>
  );
}
