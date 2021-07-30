import React from 'react';
import Image from 'next/image';
import menuHeaderImg from '/LogoRes.jpg';

export default function menuHeader(){
    return (
        <div className="back bg-no-repeat bg-cover bg-center bg-menu-header md:rounded-50px w-full h-1/2 md:h-72 align-middle flex flex-col justify-evenly items-center">
        <style jsx>{`
            .back {
                background-image:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("/LogoRes.jpg");
            }
            `}
        </style>
        <h1 className="text-white  text-6xl text-center mx-auto">Something for<br></br> Everyone...</h1>
        <div className="flex flex-col md:flex-row justify-around w-full">
            <div className=" bg-primary text-white rounded-50px mt-4 px-6 py-2 md:px-12 md:py-6 w-80 text-center mx-auto">Breakfast</div>
            <div className=" bg-primary text-white rounded-50px mt-4 px-6 py-2 md:px-12 md:py-6 w-80 text-center mx-auto">Lunch</div>
            <div className=" bg-primary  text-white rounded-50px mt-4 w-80 text-center mx-auto px-6 py-2 md:px-12 md:py-6">Dinner</div>
        </div>
        {/*<Image className="m-4" width="1200" height="400" src="/LogoRes.jpg" alt="menu header picture" />*/}</div>
            
    )
}
