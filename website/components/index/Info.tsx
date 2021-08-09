import React from 'react'

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
    }
}
export default function info(props:PropsInterface) {
    const {monday,tuesday,wednesday,thursday,friday,saturday,sunday,phone,location} = props.restaurantInfo
    return (
        <div className="flex mx-auto justify-center items-center m-8 filter drop-shadow-xl h-96 min-w-72 rounded-50px bg-gray-100">
            <div className="flex flex-col space-y-0 items-center text-black">
                <h1 className="text-4xl text-primary">Hours</h1>
                <div>Monday - {monday}</div>
                <div>Tuesday - {tuesday}</div>
                <div>Wednesday - {wednesday}</div>
                <div>Thursday - {thursday}</div>
                <div>Friday - {friday}</div>
                <div>Saturday - {saturday}</div>
                <div>Sunday - {sunday}</div>
                <h1 className="text-4xl text-primary">Phone</h1>
                <div>{phone}</div>
                <h1 className="text-4xl text-primary">Location</h1>
                <div className="w-5/6 text-center">{location}</div>
            </div>
        </div> 
    )
}
