import React from "react";
import Image from "next/image";

export default function MenuItem(props: PropsInterface) {
  const { name, description, price, image } = props.menuItem;
  return (
    <div className="w-36 h-48 md:w-72 md:h-96 filter drop-shadow-2xl rounded-2xl flex flex-col overflow-hidden items-center bg-gray-100">
      <div className="hover:bg-black group hover:bg-opacity-60 relative w-36 h-36 md:w-72 md:h-72">
        <Image
          className="mix-blend-multiply"
          objectFit="fill"
          layout="fill"
          src={image}
          alt={name}
        />
        <div className="md:mx-8 text-sm md:text-lg mt-6 md:mt-12 text-center absolute opacity-0 md:group-hover:opacity-100 w-36 h-36 md:w-60 md:h-60 top-2 text-white">
          {description}
        </div>
      </div>

      <h1
        className={`text-center m-1 text-sm md:${
          name.length >= 20
            ? name.length >= 30
              ? "text-md"
              : "text-lg"
            : "text-2xl"
        }`}
      >
        {name}
      </h1>
      <h1
        className={`text-center m-1 text-sm md:${
          price.length >= 20
            ? price.length >= 30
              ? "text-md"
              : "text-lg"
            : "text-2xl"
        }`}
      >
        {price}
      </h1>
    </div>
  );
}

interface PropsInterface {
  menuItem: {
    name: string;
    id: string;
    description: string;
    price: string;
    image: string;
  };
}
