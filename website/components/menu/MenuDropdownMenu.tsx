import { GetServerSideProps } from "next";
import React, { useState } from "react";




interface PropsInterface {
	Categories: [{
		name: string,
		id: string,
		Subcategories: [{
			name: string,
			id: string
		}]
	}]
}

export const getServerSideProps: GetServerSideProps = async () => {
	// ...
	return {
	  props: {
		Categories: [{
			name: "Breakfast",
			id:"1a",
			subcategories: [{
				name: "Cereal",
				id:"1b",
				menuItems: [{
					id:"1c",
					name:"Cheerios",
					description:"",
					price:9.99,
					image:"/LogoRes.jpg",
					type:0, //0 both - 1 Dine-in - 2 Carryout
				}]
			}]
		},{
			name: "Lunch",
			id:"2a",
			subcategories: [{
				name: "Sandwiches",
				id:"2b",
				menuItems: [{
					id:"2c",
					name:"BLT",
					description:"",
					price:9.99,
					image:"/LogoRes.jpg",
					type:0, //0 both - 1 Dine-in - 2 Carryout
				}]
			}]
		}]
			
		}
	  }
  };

  export default function MenuDropdownMenu(props: PropsInterface)  {
	const {Categories} = props
    let cards:any =[];
    for(let i =0; i < Categories[0].subcategories[0].menuItems.length; i++) {
		console.log("I will be a card");
	}
    return (
        <div>
            {cards}
        </div>
    )
}
