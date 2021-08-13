import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline"

const navigation = [
    { name: 'About', href: '/about'},
    { name: 'Contact', href: '/'},
    { name: 'Menu', href: '/menu'},
    { name: 'Catering', href: '/'},
  ]

export default function Header() {

    return <Disclosure as="nav">
    {({ open }) => (
      <>      
          <div className="relative flex items-center justify-center h-16">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center p-2">
                {open ? (
                  <XIcon className="block h-6 w-6"/>
                ) : (
                  <MenuIcon className="block h-6 w-6"/>
                )}
              </Disclosure.Button>
            </div>
			<div className="justify-center md:pl-24 justify-center">
                  <a href="/">
					<img
						className="justify-center md:justify-start h-20 w-72 bg-black"
					/>
				  </a>
            </div>	
           	 <div className="self-center ml-auto mr-24 text-black md:flex justify-end space-x-8 text-2xl lg:text-3xl hidden">
            	    {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                    >
                      {item.name}
                    </a>
                  ))}
            </div>
          </div> 
		<Transition
			show={open}
			enter="transition ease-in-out duration-700 transform"
			enterFrom="-translate-x-full scale-95"
			enterTo="translate-x-0 scale-100"
			leave="transition ease-in-out duration-500 transform"
			leaveFrom="translate-x-0 scale-95"
			leaveTo="-translate-x-full scale-100"
		>     
        <Disclosure.Panel className="absolute z-10 bg-white w-screen md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 flex flex-col text-2xl">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
              >
                {item.name}
              </a>
            ))}
          </div>
        </Disclosure.Panel>
		</Transition>
      </>
    )}
  </Disclosure>
}
