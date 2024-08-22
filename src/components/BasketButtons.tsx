import React, {FC, useContext} from 'react';
import MyButton from "./ui/MyButton";
import styled from "styled-components";
import {baseTheme} from "../styles/theme";
import {Context} from "../contexts";
import Loading from "./Loading";
import useBasketButtons from "../my_hooks/useBasketButtons";


interface IBasketButtons {
    id_order: number,
    id_user: number,
    quantity: number
}

const BasketButtons: FC<IBasketButtons> = ({id_order, id_user, quantity}) => {

    const baskets = useContext(Context).baskets;
    const {clickDel, clickUpdate, isUpdating, isDeleting} = useBasketButtons(baskets)

    return (
        <Buttons>
            <MyButton
                value={isUpdating ? <Loading/> : "Обновить"}
                funcClick={() => clickUpdate(quantity, id_order)}
            />
            <MyButton
                value={isDeleting ? <Loading/> : "Удалить"}
                funcClick={() => clickDel(id_order, id_user)}
            />

        </Buttons>
    );
};


export default BasketButtons;

const Buttons = styled.div`
    display: flex;
    justify-content: end;
    gap: 2em;
    padding-left: 50%;
    @media (${baseTheme.maxMedia.laptop1024}) {
        padding-left: 30%;
    }
    @media (${baseTheme.maxMedia.tablet768}) {
        padding-left: 0;
    }
    @media (max-width: 600px) {
        //padding-left: 25%;
        gap: 0.1em;
        flex-direction: column;
    }
    @media (${baseTheme.maxMedia.mobile425}) {
        padding-left: 0;
    }
`