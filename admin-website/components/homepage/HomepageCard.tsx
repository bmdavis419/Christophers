import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
// import SubField from "./SubField";

interface PropsInterface {
  homepageCard: {
    id: string;
    title: string;
    date: string;
    content: string;
  };
}

export default function HomepageCard(props: PropsInterface) {
  const { homepageCard } = props;
  const [homepageCardState, setHomepageCardState] = useState(homepageCard);
  const [canUpdate, setCanUpdate] = useState(false);

  // create the mutations
  const [updateHomepageCard, { loading, error }] = useMutation(gql`
    mutation UpdateHomepageCardMutation(
      $updateHomepageCardId: String!
      $updateHomepageCardTitle: String
      $updateHomepageCardDate: String
      $updateHomepageCardContent: String
    ) {
      updateHomepageCard(
        id: $updateHomepageCardId
        title: $updateHomepageCardTitle
        date: $updateHomepageCardDate
        content: $updateHomepageCardContent
      ) {
        title
        date
        content
        id
      }
    }
  `);
  const [removeHomepageCard] = useMutation(gql`
    mutation UpdateHomepageCardMutation($removeHomepageCardId: ID!) {
      removeHomepageCard(id: $removeHomepageCardId)
    }
  `);

  return (
    <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            title
          </label>
          <input
            id="title"
            type="text"
            placeholder="title"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={homepageCardState.title}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setHomepageCardState({
                ...homepageCardState,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date"
          >
            date
          </label>
          <input
            id="date"
            type="text"
            placeholder="date"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={homepageCardState.date}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setHomepageCardState({
                ...homepageCardState,
                date: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="content"
          >
            content
          </label>
          <input
            id="content"
            type="text"
            placeholder="content"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            value={homepageCardState.content}
            onChange={(e) => {
              e.preventDefault();
              setCanUpdate(true);
              setHomepageCardState({
                ...homepageCardState,
                content: e.target.value,
              });
            }}
          />
        </div>

        <button
          className="col-start-1 col-end-2 ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          disabled={!canUpdate}
          onClick={(e) => {
            setCanUpdate(false);

            updateHomepageCard({
              variables: {
                updateHomepageCardId: homepageCardState.id,
                updateHomepageCardTitle: homepageCardState.title,
                updateHomepageCardDate: homepageCardState.date,
                updateHomepageCardContent: homepageCardState.content,
              },
            });
          }}
        >
          {loading ? "...loading" : "Update"}
        </button>
        <button
          className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
          onClick={(e) => {
            removeHomepageCard({
              variables: {
                removeHomepageCardId: homepageCardState.id,
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
