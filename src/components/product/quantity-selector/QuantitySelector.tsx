'use client'

import { updateCartItems } from "@/cart/actions/actions";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface Props {    
    quantity: number;
    onChangeQuantity: ( quantity: number ) => void
}

export const QuantitySelector = ({ quantity, onChangeQuantity }: Props) => {

    const [displayQuantity, setDisplayQuantity ] = useState( quantity );

    const updateQuantity = (value: number) => {
        if( (displayQuantity + value ) < 1 ) return;
        
        setDisplayQuantity( displayQuantity + value );
        onChangeQuantity( displayQuantity + value );
    }


    return (
        <div className="flex">
            <button onClick={() => updateQuantity( -1 ) }>
                <IoRemoveCircleOutline size={30} />
            </button>

            <div className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
                { displayQuantity }
            </div>

            <button onClick={() => updateQuantity( +1 ) }>
                <IoMdAddCircleOutline size={30} />
            </button>
        </div>
    )
}
