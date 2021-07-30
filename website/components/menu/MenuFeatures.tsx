import React, {useState} from 'react';
import Image from 'next/image'

interface PropsInterface {
    activeFeature: number,
    numFeatures:number,
    Feature:any,
    setActiveFeature:Function

}
export default function MenuFeatures(props: PropsInterface) {
    const {activeFeature,numFeatures,Feature,setActiveFeature} = props;
   let circles:any = [];
   for(let i:number = 0; i < numFeatures; i++) {
    circles.push(<div onClick={(e) => {setActiveFeature(e,i)}} className={`rounded-full mt-auto md:m-3 p-3 md:p-4 bg-${activeFeature == i ? "primary": "gray-400"}`}></div>)
    }

    return (
        <div className="overflow-hidden relative md:rounded-50px w-full  md:mt-16 md:h-.4vw align-middle grid md:grid-cols-2 justify-evenly items-center filter drop-shadow-xl bg-gray-50">
            <div className=" h-full relative w-full"><Image layout="fill" objectFit="fill" src={`/${Feature.menuItem.image}`} alt="Image of featured dish" /></div>
            <div className="my-16 flex flex-col text-center w-2/3 mx-auto">
                <h1 className="text-2xl lg:text-5xl font-bold">{Feature.name}</h1>
                <h2 className="text-md lg:text-3xl">{Feature.type}</h2>
                <p className="text-sm lg:text-3xl">{Feature.menuItem.description}</p>
                <div className="flex flex-row self-end mx-auto">{circles}</div>
            </div>
        </div>
    )
}

