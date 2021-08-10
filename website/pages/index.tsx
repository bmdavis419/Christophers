import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import React from "react";
import Info from "../components/index/Info";
import client from "../apollo-client";

interface PropsInterface {
  homepageBanner: {
    topText: string;
    midText: string;
    bottomText: string;
    leftLinkText: string;
    leftLink: string;
    rightLinkText: string;
    rightLink: string;
    images: [string];
  };
  restaurantInfo: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    phone: number;
    location: string;
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  // get the data
  const { data } = await client.query({
    query: gql`
      {
        homepageBanner {
          topText
          midText
          bottomText
          leftLinkText
          leftLink
          rightLinkText
          rightLink
          images
        }
        restaurantInfo {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
          phone
          location
        }
      }
    `,
  });

  return {
    props: {
      homepageBanner: data.homepageBanner,
      restaurantInfo: data.restaurantInfo,
    },
  };
};

export default function Home(props: PropsInterface) {
  const { homepageBanner, restaurantInfo } = props;
  return (
    <div className="grid grid-cols-3">
      <Info restaurantInfo={restaurantInfo} />
    </div>
  );
}
