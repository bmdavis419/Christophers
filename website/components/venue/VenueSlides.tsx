import React from 'react'
import Image from 'next/image';

interface PropsInterface {
    activeVenue: number,
    numVenues:number,
    Venue:any,
    setActiveVenue:Function

}
export default function VenueSlides(props:PropsInterface) {
    const {activeVenue, numVenues, Venue, setActiveVenue} = props
    let circles:any = [];
    for(let i:number = 0; i < numVenues; i++) {
        circles.push(<div onClick={(e) => {setActiveVenue(e,i)}} className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${activeVenue == i ? "primary": "gray-400"}`}></div>)
        }
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2">
            <h1 className="col-span-2 text-center text-primary text-6xl m-2 mb-8">Venue Title</h1>
            <div className="flex flex-col justify-center align-center">
            <div className="relative bg-black bg-opacity-60 xl:rounded-50px xl:h-1/3vw h-100vw w-100vw xl:w-1/3vw mx-auto">
                <Image className="mix-blend-multiply xl:mix-blend-normal relative" objectFit="fill" layout="fill" src="logos/LogoRes.jpg" alt="Venue banner image"/>
            </div>
            </div>
            {/*Add ternery operator to control text size to make sure it fits based on character length*/}
                    <p className={`relative text-center w-10/12 lg:w-2/3 m-auto text-xl text-white xl:text-black`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nisi praesentium magnam enim quis odio assumenda veniam aliquam accusantium ullam, modi eos officiis voluptates mollitia, quia dicta. Repellat soluta culpa obcaecati atque doloremque et fugiat neque velit voluptate laboriosam commodi quis, ab iusto necessitatibus, accusamus nostrum provident cupiditate fugit aspernatur!</p>
                    <div className="relative mix-blend normal flex flex-row self-end mx-auto col-span-2 m-4">{circles}</div>
        </div>
    )
}
