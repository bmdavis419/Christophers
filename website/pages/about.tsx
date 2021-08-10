import { GetServerSideProps } from "next";
import React from "react";

interface PropsInterface {
  topHeading: string;
  subHeading: string;
  content: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  return {
    props: {
      topHeading:
        "Hidden in Woodman Plaza, Christopher's is Dayton’s Best Hidden Gem",
      subHeading: "WE ARE OPEN FOR DINE IN GAng GANG!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
  };
};

export default function about(props: PropsInterface) {
  const { topHeading, subHeading, content } = props;
  return (
    <div>
      <div className="text-center text-primary font-bold text-3xl md:text-6xl flex justify-center pt-24">
        <div className="max-w-9/10 md:max-w-1/2">{topHeading}</div>
      </div>
      <div className="text-center text-black text-Roboto font-bold text-2xl md:text-5xl flex justify-center pt-10">
        <div className="max-w-1/2">{subHeading}</div>
      </div>
      <div className="text-center text-black text-base md:text-2xl flex justify-center pt-12 pb-40">
        <div className="max-w-3/4">{content}</div>
      </div>
    </div>
  );
}
