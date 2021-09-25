import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";
import RestaurantFAQCard from "./faq/RestaurantFAQCard";

export default function RestaurantFAQ() {
  const GET_QNA = gql`
    {
      restaurantFAQ {
        id
        question
        answer
      }
    }
  `;

  const [createRestaurantFAQ] = useMutation(gql`
    mutation Mutation(
      $createRestaurantFAQQuestion: String!
      $createRestaurantFAQAnswer: String!
    ) {
      createRestaurantFAQ(
        question: $createRestaurantFAQQuestion
        answer: $createRestaurantFAQAnswer
      ) {
        id
        question
        answer
      }
    }
  `);

  const { loading, error, data } = useQuery(GET_QNA);
  const [cards, setCards] = useState<any>([]);
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
  });
  const [canCreate, setCanCreate] = useState({
    question: false,
    answer: false,
  });

  useEffect(() => {
    if (data != undefined) {
      const temp = [...data.restaurantFAQ];
      setCards(temp);
    }
  }, [data]);

  // make sure there is data before render
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between mb-7 px-4 rouned-xl shadow-lg py-4">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            placeholder="Question"
            onChange={(e) => {
              setCanCreate({ ...canCreate, question: true });
              e.preventDefault();
              setNewCard({ ...newCard, question: e.target.value });
            }}
          />
          <input
            type="text"
            className="bg-gray-300 px-3 py-3 rouned-lg"
            placeholder="Answer"
            onChange={(e) => {
              setCanCreate({ ...canCreate, answer: true });
              e.preventDefault();
              setNewCard({ ...newCard, answer: e.target.value });
            }}
          />

          <button
            className="ml-4 bg-green-500 text-white rounded-lg px-2 py-1 hover:bg-green-400 inline-block"
            disabled={!canCreate}
            onClick={(e) => {
              setCanCreate({
                question: false,
                answer: false,
              });

              createRestaurantFAQ({
                variables: {
                  createRestaurantFAQQuestion: newCard.question,
                  createRestaurantFAQAnswer: newCard.answer,
                },
              });
            }}
          >
            Create new restaurant FAQ
          </button>
        </div>
      </div>
      {cards.map((card: { id: string; question: string; answer: string }) => {
        return <RestaurantFAQCard restaurantFAQCard={card} key={card.id} />;
      })}
    </div>
  );
}
