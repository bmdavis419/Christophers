import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  return {
    props: {
      topText: "lmao jaja text",
    },
  };
};

export default function about(props: { topText: string }) {
  const { topText } = props;
  return <div>{topText}</div>;
}
