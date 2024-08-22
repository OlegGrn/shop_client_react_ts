import React, {SetStateAction, useState} from "react";

interface IUseCounterService{
    quantity: number;
    setQuantity: React.Dispatch<SetStateAction<number>>
    increment: (availableQuantity: number) => void
    decrement: ()=> void

}



export default function useCounterService(def: number = 1): IUseCounterService{

    const [quantity, setQuantity] = useState<number>(def)

    const increment = (availableQuantity: number) => {
        if (quantity < availableQuantity) {
            setQuantity(quantity + 1)
        }
    }
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return {
        quantity, setQuantity, increment, decrement
    }
}