import { GetServerSideProps } from "next";
import React, { useState } from "react";




interface PropsInterface {
	categories: [{
		name: string,
		subcategories: [{
			name: string,
			id: string
		}]
	}],
	setActiveId: Function
	activeId:string
}

  export default function MenuDropdownMenu(props: PropsInterface)  {
	const {categories,setActiveId,activeId} = props
	const [activeDD,setActiveDD] = useState(0);
	const dropdown = categories.map(
		(cat,index) =><div><button  className={`block text-white drop-shadow-xl relative md:text-2xl py-8 w-full md:w-56 md:${index=== 0 ? "rounded-t-3xl": ""}  ${activeDD === index ? "bg-secondary" : "bg-primary"}`} onClick={(e) => {showDropDown(e,index)
			setActiveId(e,cat.subcategories[0].id)}}>{cat.name}</button>
		<div className={`md:p-4 justify-center grid grid-cols-4 md:grid-cols-1 md:relative absolute w-screen left-0 md:w-56  h-${cat.subcategories.length <= 4 ? "24" : "48"} md:h-${cat.subcategories.length * 8+8} bg-gray-50 ${activeDD === index ? "visible" : "hidden invisible"}`}>
			{cat.subcategories.map((sub,i) => <button className={` ${activeId == sub.id ?'text-secondary' :'text-black'} text-sm  md:text-xl w-auto`}onClick={(e)=>{setActiveId(e,sub.id)}}>
				{sub.name}
				</button>)}
		</div>
		</div>)
		console.log(activeId);
    return (
        <div className={`z-10 sticky top-0 md:top-12 mb-${categories[activeDD].subcategories.length <=4 ? "24" : "48"} grid grid-cols-${categories.length} auto-cols-max gap-0 md:grid-cols-1 filter drop-shadow-sm max-h-72 grow-1`}>
            {dropdown}
			<div className={`hidden md:block relative rounded-b-3xl py-8 w-56 bg-primary`}></div>
        </div>
    )
	function showDropDown(e:React.MouseEvent, i:number) {
		e.preventDefault
		setActiveDD(i);
	}
}
