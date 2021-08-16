import React, { useState } from 'react'
import Image from 'next/image';
import VenueSlides from '../../components/venue/VenueSlides';
import ContactCateringForm from '../../components/contactCatering/ContactCateringForm';
import client from '../../apollo-client';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import Info from '../../components/index/Info';


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
	homepageFeatures: [{
		id:string;
		title:string;
		description:string;
		topLinkText:string;
		topLink:string;
		bottomLinkText:string;
		bottomLink:string;
		image:string;
	  }];
}

export const getServerSideProps: GetServerSideProps = async () => {
	// get the data
	const { data } = await client.query({
		query: gql`
			{

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
			restaurantInfo: data.restaurantInfo,
		},
	};
};
export default function venue(props:PropsInterface) {
    const {restaurantInfo} = props
    const [index,setIndex] = useState(0);
    function setActiveVenue(e: HTMLFormElement, i: number) {
        e.preventDefault;
        setIndex(i);
      }
    return (
        <div>
             <div className="flex flex-col justify-evenly items-center relative w-full p-12 h-3/4vw sm:h-1/2vw lg:h-1/3vw overflow-hidden">
                <Image className="" objectFit="cover" layout="fill" src="logos/LogoRes.jpg" alt="Venue banner image"/>
            </div>
            <VenueSlides numVenues={4} activeVenue={index} Venue={1} setActiveVenue={setActiveVenue} />
        <div className="flex justify-center flex-col lg:flex-row align-center">
            <div className="lg:mx-2 mx-auto"><ContactCateringForm /></div>
            <div className="max-w-144"><Info restaurantInfo={restaurantInfo}/></div>
        </div>
        </div>  
    )
}
