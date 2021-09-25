import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
  cateringFAQCard: {
    id: string;
    question: string;
    answer: string;
  };
}

export default function CateringFAQCard(props: PropsInterface) {
  const { cateringFAQCard } = props;
  const [cateringFAQState, setCateringFAQState] = useState(cateringFAQCard);
  const [canUpdate, setCanUpdate] = useState(false);

  // create the mutations
  const [updateCateringFAQ, { loading, error }] = useMutation(gql`
    mutation Mutation(
      $updateCateringFaqId: String!
      $updateCateringFaqQuestion: String
      $updateCateringFaqAnswer: String
    ) {
      updateCateringFAQ(
        id: $updateCateringFaqId
        question: $updateCateringFaqQuestion
        answer: $updateCateringFaqAnswer
      ) {
        id
        question
        answer
      }
    }
  `);
  const [removeCateringFAQ] = useMutation(gql`
    mutation Mutation($removeCateringFaqId: ID!) {
      removeCateringFAQ(id: $removeCateringFaqId)
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
            value={cateringFAQState.question}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setCateringFAQState({
                ...cateringFAQState,
                question: e.target.value,
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
            value={cateringFAQState.answer}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setCateringFAQState({
                ...cateringFAQState,
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

            updateCateringFAQ({
              variables: {
                updateCateringFaqId: cateringFAQState.id,
                updateCateringFaqQuestion: cateringFAQState.question,
                updateCateringFaqAnswer: cateringFAQState.answer,
              },
            });
          }}
        >
          {loading ? "...loading" : "Update"}
        </button>
        <button
          className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          onClick={(e) => {
            removeCateringFAQ({
              variables: {
                removeCateringFaqId: cateringFAQState.id,
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
