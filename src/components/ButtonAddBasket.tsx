import React, {FC, SetStateAction, useState} from 'react';
import MyButton from "./ui/MyButton";
import Loading from "./Loading";
import {baseTheme} from "../styles/theme";
import styled from "styled-components";
import {useAddBasket} from "../my_hooks/useAddBasket";

interface IButtonAddBasket {
    quantity: number;
    setQuantity: React.Dispatch<SetStateAction<number>>
    idUser: number | undefined,
    deviceId: number,
    sizeID: number,
}

const ButtonAddBasket: FC<IButtonAddBasket> = (
    {
        quantity, setQuantity,
        sizeID, idUser,
        deviceId
    }) => {

    const [adding, setAdding] = useState<boolean>(true)

    const clickAddBasket = useAddBasket(
        idUser, deviceId, sizeID,
        quantity, setQuantity, adding, setAdding
    )

    return (
        <AddBasket>
            <MyButton
                noClick={quantity === 0}
                noFocus={quantity === 0}
                value={!adding
                    ? <Loading/>
                    : quantity === 0
                        ? "УЖЕ в КОРЗИНЕ"
                        : "В КОРЗИНУ"}
                funcClick={clickAddBasket}
            />
        </AddBasket>
    );
};

export default ButtonAddBasket;

const AddBasket = styled.p`
  min-width: 200px;

  @media (${baseTheme.maxMedia.tablet768}) {
    max-width: 550px;
    width: 100%;
    align-self: center;
  }
`