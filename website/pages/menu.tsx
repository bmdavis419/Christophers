import { GetServerSideProps } from "next";
import React, { useState } from "react";
import MenuHeader from '../components/menu/MenuHeader';
import MenuFeatures from '../components/menu/MenuFeatures';
import MenuDropdownMenu from '../components/menu/MenuDropdownMenu';
interface PropsInterface {
	Features: [{
		name: string,
		id: string,
		type: string,
		menuItem: [{
			name:string,
			id: string,
			description:string,
			price:number,
			image:string,
			type:number, //0 both - 1 Dine-in - 2 Carryout
			}]
		}],
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
		  Features: [{
			  name: "Fresh Beef",
			  id:1,
			  type:"Daily Special",
			  menuItem: {
				description: "This is our very special dish that is only available today. It includes one fresh side and a desert! Available on Tuesdays.",
				id: 1,
				image:"LogoRes.jpg"
			  }
			 

		  },
		  {
			name: "Fresh Beef 2",
			id:1,
			type:"Fresh Fish",
			menuItem: {
			  description: "2nd is our very special dish that is only available today. It includes one fresh side and a desert! Available on Tuesdays.",
			  id: 2,
			  image:"LogoRes.jpg"
			}
		   

		},
		{
			name: "Fresh Beef 3",
			id:1,
			type:"Big Money",
			menuItem: {
			  description: "3rd is our very special dish that is only available today. It includes one fresh side and a desert! Available on Tuesdays.",
			  id: 1,
			  image:"LogoRes.jpg"
			}
		   

		},
		{
			name: "Fresh Beef 3",
			id:1,
			type:"Big Money",
			menuItem: {
			  description: "3rd is our very special dish that is only available today. It includes one fresh side and a desert! Available on Tuesdays.",
			  id: 1,
			  image:"LogoRes.jpg"
			}
		   

		},
		]
			
		}
	  }
  };

export default function menu(props:PropsInterface) {
	console.log(props);
	const {Features} = props
	const [index, setIndex] = useState(0);

  function setActiveFeature(e:HTMLFormElement,i:number) {
	  e.preventDefault
	  setIndex(i);
  }
	return( <div className="md:mt-16 md:mx-80%  flex flex-col items-center justify-center">
			<MenuHeader/>
			<MenuFeatures numFeatures={Features.length} activeFeature={index} Feature={Features[index]} setActiveFeature={setActiveFeature}/>
	</div>);
}
