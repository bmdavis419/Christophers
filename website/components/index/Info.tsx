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
    let d = new Date();
    return (
        <div className="flex mx-auto justify-center items-center filter drop-shadow-xl w-96 h-144 min-w-96 rounded-50px bg-gray-100">
            <div className="flex flex-col space-y-0 items-center text-black">
                <h1 className="text-6xl text-primary">Hours</h1>
                <div className={`${1 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Monday - {monday}</div>
                <div className={`${2 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Tuesday - {tuesday}</div>
                <div className={`${3 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Wednesday - {wednesday}</div>
                <div className={`${4 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Thursday - {thursday}</div>
                <div className={`${5 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Friday - {friday}</div>
                <div className={`${6 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Saturday - {saturday}</div>
                <div className={`${0 == d.getDay() ? "text-primary" : "text-black"} text-xl `}>Sunday - {sunday}</div>
                <h1 className="text-6xl text-primary">Phone</h1>
                <div className="text-xl">{phone}</div>
                <h1 className="text-6xl text-primary">Location</h1>
                <div className="w-5/6 text-center text-xl">{location}</div>
            </div>
        </div> 
    )
}
