import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import React from 'react'
import client from '../apollo-client';
import ContactForm from '../components/contact/ContactForm'
import ContactCateringForm from '../components/contactCatering/ContactCateringForm';
import Info from '../components/index/Info'

interface PropsInterface {
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
export default function contact(props:PropsInterface) {
    const {restaurantInfo} = props
    return (
        <div className="flex justify-center flex-col lg:flex-row align-center">
            <div className="lg:mx-2 mx-auto"><ContactForm /></div>
            <div className="max-w-144"><Info restaurantInfo={restaurantInfo}/></div>
        </div>
    )
}
