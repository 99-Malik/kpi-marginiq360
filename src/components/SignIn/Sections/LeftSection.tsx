import React from 'react'
import Image from 'next/image'

export default function LeftSection() {
    return (
        <div className="hidden md:flex md:w-[50%]  relative">
        <Image
            src="/images/signIn.jpg"
            alt="Restaurant interior"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            style={{ imageRendering: 'auto' }}
        />
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/20 z-0" />


        <div className="absolute bottom-8 left-0 z-10 p-6 text-white w-full">
            <h2 className="text-2xl font-bold mb-2">Welcome to Restaurant App</h2>
            <p className="text-sm leading-relaxed opacity-90">
                You can now setup your own restaurant according to your needs and customize it by your choice.
            </p>
        </div>
    </div>
    )
}
