import { GetServerSideProps } from "next";
import React from "react";
import MenuHeader from '../components/menu/MenuHeader';

interface PropsInterface {
	Categories: [{
		name: string,
		id: string,
		subcategories: [{
			name: string,
			id: string,
			menuItems: [{
				name:string,
				id: string,
				description:string,
				price:number,
				image:string,
				type:number, //0 both - 1 Dine-in - 2 Carryout
			}]
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
					image:"lmao",
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
					image:"lmao",
					type:0, //0 both - 1 Dine-in - 2 Carryout
				}]
			}]
		}]
			
		}
	  }
  };
export default function menu(props:PropsInterface) {
	console.log(props);
	return( <div className="md:mt-16 md:mx-80%  flex flex-col items-center justify-center">
			<MenuHeader/>
	</div>);
}
