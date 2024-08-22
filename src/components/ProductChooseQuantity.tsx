import React, {FC, useContext} from 'react';
import {Context} from "../contexts";
import {ISizesQuantity} from "../store/productStore";
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import Loading from "./Loading";
import {IUserBasket} from "../store/basketStore";

interface IChooseQuantity {
    chosenSize: ISizesQuantity
    decrement: () => void
    increment: (qty: number) => void
    quantity: number
    dispatch: React.Dispatch<number>
}


const ProductChooseQuantity: FC<IChooseQuantity> = observer( (
    {
        increment,
        decrement,
        quantity,
        chosenSize,
        dispatch
    }
) => {
    console.log("render ProductChooseQuantity")

    const basketsStore = useContext(Context).baskets;
    const isLoading = basketsStore.isLoading();

    //получаем массив товаров из стора по юзеру, и ищём, есть ли такой товар
    // (id_device и id_size) в его корзине
    let candidate: IUserBasket | undefined = basketsStore.userBasket.find(item => {
        return (item.id_device == chosenSize.deviceId && item.size_id == chosenSize.sizeID)
    })
    // и полуем либо их количество, либо undefined
    let quantityFromBD = candidate? candidate.quantity_chosen : undefined;

    //доступное количество товара для юзера по данному размеру с учетом
    // того что уже есть в БД
    let availableQuantity = quantityFromBD
        ? (chosenSize.quantity - quantityFromBD)
        : chosenSize.quantity;

    if (availableQuantity === 0) {
        //через setTimeout для устранения плохих useState
        setTimeout(() => dispatch(0), 0 )
    }

    return (
        <ChooseQuantity>
            <button onClick={() => decrement()}>---</button>
            {isLoading
                ? <Loading/>
                : <p>{availableQuantity === 0 ? 0: quantity}</p>}
            <button onClick={() => increment(availableQuantity)}>-|-</button>
        </ChooseQuantity>
    );
});

export default ProductChooseQuantity;

const ChooseQuantity = styled.div`

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

  button {
    align-self: center;
    font-size: inherit;
    width: 3em;
    height: 3em;
    font-weight: lighter;
  }

  p {
    font-size: inherit;
    align-self: center;
    justify-self: center;
  }
`