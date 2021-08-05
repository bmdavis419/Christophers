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
		(cat,index) =><div><button  className={`text-white drop-shadow-xl relative text-2xl py-8 max-w-56 w-56 ${index=== 0 ? "rounded-t-3xl": ""}  ${activeDD === index ? "bg-secondary" : "bg-primary"}`} onClick={(e) => {showDropDown(e,index)
			setActiveId(e,cat.subcategories[0].id)}}>{cat.name}</button>
		<div className={` p-4 justify-center flex flex-col relative w-56 h-${cat.subcategories.length * 8+8} bg-gray-50 ${activeDD === index ? "visible" : "hidden invisible"}`}>
			{cat.subcategories.map((sub,i) => <button className={` ${activeId == sub.id ?'text-secondary' :'text-black'} text-xl w-full`}onClick={(e)=>{setActiveId(e,sub.id)}}>
				{sub.name}
				</button>)}
		</div>
		</div>)
		console.log(activeId);
    return (
        <div className="filter drop-shadow-sm max-h-72">
            {dropdown}
			<div className={`rounded-b-3xl py-8 max-w-56 bg-primary`}></div>
        </div>
    )
	function showDropDown(e:React.MouseEvent, i:number) {
		e.preventDefault
		setActiveDD(i);
	}
}
