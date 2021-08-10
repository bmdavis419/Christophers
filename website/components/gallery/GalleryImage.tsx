import React from 'react'
import Image from 'next/image'

interface PropsInterface {
    pic: string,
    index: number
}

export default function GalleryImage(props:PropsInterface) {
    const {pic, index} = props
    return (
        <div className={`h-300 w-300 md:h-550 md:w-550 relative sm:justify-self-${index % 2 == 0 ? "end" : "start"}`}>
            <Image className="rounded-40" src={pic} alt='bruh' layout='fill'/>
        </div>
    )
}
