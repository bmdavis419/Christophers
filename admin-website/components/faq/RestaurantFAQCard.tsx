import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
  restaurantFAQCard: {
    id: string;
    question: string;
    answer: string;
  };
}

export default function RestaurantFAQCard(props: PropsInterface) {
  const { restaurantFAQCard } = props;
  const [restaurantFAQState, setRestaurantFAQState] =
    useState(restaurantFAQCard);
  const [canUpdate, setCanUpdate] = useState(false);

  // create the mutations
  const [updateRestaurantFAQ, { loading, error }] = useMutation(gql`
    mutation Mutation(
      $updateRestaurantFaqId: String!
      $updateRestaurantFaqQuestion: String
      $updateRestaurantFaqAnswer: String
    ) {
      updateRestaurantFAQ(
        id: $updateRestaurantFaqId
        question: $updateRestaurantFaqQuestion
        answer: $updateRestaurantFaqAnswer
      ) {
        id
        question
        answer
      }
    }
  `);
  const [removeRestaurantFAQ] = useMutation(gql`
    mutation Mutation($removeRestaurantFaqId: ID!) {
      removeRestaurantFAQ(id: $removeRestaurantFaqId)
    }
  `);

  return (
    <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="question"
          >
            question
          </label>
          <input
            id="question"
            type="text"
            placeholder="question"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantFAQState.question}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantFAQState({
                ...restaurantFAQState,
                answer: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="answer"
          >
            answer
          </label>
          <input
            id="answer"
            type="text"
            placeholder="answer"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={restaurantFAQState.answer}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setRestaurantFAQState({
                ...restaurantFAQState,
                answer: e.target.value,
              });
            }}
          />
        </div>

        <button
          className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          disabled={!canUpdate}
          onClick={(e) => {
            setCanUpdate(false);

            updateRestaurantFAQ({
              variables: {
                updateRestaurantFaqId: restaurantFAQState.id,
                updateRestaurantFaqQuestion: restaurantFAQState.question,
                updateRestaurantFaqAnswer: restaurantFAQState.answer,
              },
            });
          }}
        >
          {loading ? "...loading" : "Update"}
        </button>
        <button
          className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          onClick={(e) => {
            removeRestaurantFAQ({
              variables: {
                removeRestaurantFaqId: restaurantFAQState.id,
              },
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
