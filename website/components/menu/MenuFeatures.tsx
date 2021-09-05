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
    circles.push(<div onClick={(e) => {setActiveFeature(e,i)}} className={`rounded-full mt-auto m-2 lg:m-3 p-3 xl:p-4 2xl:p-5 bg-${activeFeature == i ? "primary": "gray-400"}`}></div>)
    }

    return (
        <div className="overflow-hidden relative md:rounded-50px w-full sm:h-1/2vw md:h-1/3vw md:mt-16 grid sm:grid-cols-2 justify-evenly filter drop-shadow-xl bg-gray-50">
            <div className="sm:h-1/2vw md:h-1/3vw relative w-full"><Image layout="fill" objectFit="fill" src={Feature.menuItem.image} alt="Image of featured dish" /></div>
            <div className="text-white sm:text-black sm:pt-12 bg-black bg-opacity-60 sm:bg-transparent sm:bg-opacity-100 p-4 space-y-2 xl:space-y-4 2xl:space-y-8 h-4/5vw flex flex-col text-center lg:w-2/3 mx-auto">
                <Image className="relative visible sm:invisible mix-blend-darken" objectFit="fill" layout="fill" src={Feature.menuItem.image} alt="small screen image of featured dish"/>
                <h1 className="relative mix-blend normal text-xl xl:text-2xl 2xl:text-4xl font-bold">{Feature.menuItem.name}</h1>
                <h2 className="relative mix-blend normal text-md xl:text-xl 2xl:text-3xl">{Feature.type}</h2>
                <p className="relative mix-blend normal h-10vw text-sm xl:text-xl 2xl:text-xl">{Feature.menuItem.description}</p>
                <div className="relative mix-blend normal w-40 md:w-1/2 mx-auto 2xl:text-3xl rounded-full py-2 bg-primary text-white self-end">Order Online</div>
                <div className="relative mix-blend normal flex flex-row self-end mx-auto">{circles}</div>
            </div>
        </div>
    )
}

