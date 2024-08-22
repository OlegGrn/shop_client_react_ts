import React, {FC} from 'react';
import {ISizesQuantity} from "../store/productStore";

import ProductChooseQuantity from "./ProductChooseQuantity";

import ButtonAddBasket from "./ButtonAddBasket";
import useCounterService from "../my_hooks/useCounterService";

interface IAddingBasket {
    //{sizeID: number, deviceId: number, sizeName: number,quantity: number}
    chosenSize: ISizesQuantity
    id_user: number | undefined
}

const AddingBasket: FC<IAddingBasket> = (
    {
        chosenSize,
        id_user
    }) => {

    console.log("render AddingBasket")
    const {
        quantity,
        setQuantity,
        decrement,
        increment
    } = useCounterService()

    return (
        <>
            <ProductChooseQuantity
                chosenSize={chosenSize}
                decrement={decrement}
                increment={increment}
                quantity={quantity}
                dispatch={setQuantity}
            />
            <ButtonAddBasket
                quantity={quantity}
                setQuantity={setQuantity}
                idUser={id_user}
                deviceId={chosenSize.deviceId}
                sizeID={chosenSize.sizeID}
            />
        </>
    );
};

export default AddingBasket;


