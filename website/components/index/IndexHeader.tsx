import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import menuHeaderImg from '/LogoRes.jpg';

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
};

export default function IndexHeader(props:PropsInterface){
    const {homepageBanner} = props;
    const dummyButton = ""
    //Timer in react
    const [i, setI] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            if(homepageBanner.images) {
                var index = i + 1;
                setI(i >= homepageBanner.images.length - 1 ? 0 : i + 1);
                console.log(i);
            }
        }, 1000);
        return () => clearInterval(interval);
      });

    
    return (
       <div className="flex flex-col justify-evenly items-center relative w-full p-12 h-3/4vw sm:h-1/2vw lg:h-1/3vw overflow-hidden drop-shadow-xl bg-black bg-opacity-60 ">
           <Image className="mix-blend-multiply" objectFit="cover" layout="fill" src={homepageBanner.images ? homepageBanner.images[i] : "default.jpg"} alt="Index Header Background Image"/>
           <h1 className="relative mix-blend-normal text-white text-xl md:text-5xl xl:text-6xl text-center mx-auto font-bold">{homepageBanner.topText}</h1>
           <h1 className="relative mix-blend-normal text-white text-lg md:text-2xl xl:text-3xl text-center mx-auto w-11/12">{homepageBanner.midText}</h1>
            <div className="relative mix-blend-normal justify-center flex flex-col md:flex-row w-full">
                {/*Regex expression is used to check if the button text is empty, if it is the button doens't appear */} 
                <button className={`rounded-full m-2 max-w-full mx-auto md:mx-8 py-2 px-4 text-white text-xl bg-primary ${/\S/.test(homepageBanner.leftLinkText) ? "block" : "hidden"}`}> {homepageBanner.leftLinkText}</button>
                <button className={`rounded-full m-2 max-w-full mx-auto md:mx-8 py-2 px-4 text-white text-xl bg-primary ${/\S/.test(homepageBanner.rightLinkText) ? "block" : "hidden"}`}>{homepageBanner.rightLinkText}</button>
            </div>
            <div className="relative mix-blend-normal text-white text-xl md:text-3xl xl:text-5xl text-center mx-auto">{homepageBanner.bottomText}</div>
       </div>
    )
}
