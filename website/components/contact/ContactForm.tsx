import React from 'react'

export default function ContactForm() {
    return (
        <form className="w-full max-w-lg">
            <div className="flex flex-wrap mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                    First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="John">
                    </input>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                    Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="last-name" type="text" placeholder="Doe">
                    </input>
                </div>
                
            </div>
            <div className="flex flex-wrap mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="something@gmail.com">
                    </input>
                </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-subject">
                    Subject
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 bordertext-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-subject" type="text" placeholder="The Subject">
                    </input>
                </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-4">
                <div className="w-full px-3">
                    <label htmlFor="grid-message" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Message
                    </label>
                    <textarea name="" id="grid-message" cols="30" rows="10" className="bg-gray-200 w-full py-3 px-4 focus:bg-white rounded border border-gray-300" placeholder="The Message"></textarea>
                </div>
            </div>
      </form>
    )
}
