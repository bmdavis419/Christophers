import React from 'react'
import { gql, useQuery } from '@apollo/client';
import MenuItem from './MenuItem';


interface PropsInterface {
    id: String,
    name: String,
}
interface DataInterface {
    data: {
        subcategory: {
            menuItems: [{
                name: string,
                description: string,
                price:number,
                image:string,
                type:number,
                id:string,
        }]
        name:string,
    }
    }
}
export default function MenuBox(props: PropsInterface) {

    const { loading,error,data } = useQuery(GET_MENU_ITEMS, {variables:{id:props.id}});


var nums = [];
for (var i = 1; i <= 16; i++) {
   nums.push(i);
}
    if (loading) return <div className="grid grid-flow-row grid-cols-4 gap-16 mb-16 mx-16">
        {nums.map(()=> {return <div className="h-72 w-72 gray-300 "></div>})}
</div>;
    if (error) return <div>`Error! ${error}`</div>;
    return (
        <div className="grid grid-flow-row grid-cols-4 gap-16 mb-16 mx-16">
            {data.subcategory.menuItems && data.subcategory.menuItems.map((menuItem:any) => {return <MenuItem menuItem={menuItem}/>})}
        </div>
    )
}
const GET_MENU_ITEMS = gql`
    query Subcategory($id: ID!) {
        subcategory(id:$id) {
            menuItems {
                name
                description
                price
                type
                image
                id
            }
        }
    }
    `;