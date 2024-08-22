import React, {FC} from 'react';
import {IUserBasket} from "../store/basketStore";
import styled from "styled-components";
import Counter from "./Counter";
import BasketButtons from "./BasketButtons";
import useCounterService from "../my_hooks/useCounterService";
import PaymentSwitch from "./PaymentSwitch";
import {baseTheme} from "../styles/theme";

interface IRowInBasket {
    deviceInBasket: IUserBasket,
}

const OrderInBasket: FC<IRowInBasket> = (
    {deviceInBasket}
) => {

    const {quantity, decrement, increment} = useCounterService
    (deviceInBasket.quantity_chosen
        ? deviceInBasket.quantity_chosen
        : 1
    )
    let sum = deviceInBasket.price * quantity

    return (
        <Content>
            <GridBody>
                <FotoDevice></FotoDevice>
                <Description>
                    <p>Наименование: {deviceInBasket.device}</p>
                    <p>Размер: {deviceInBasket.size_name}</p>
                </Description>
                <CoverCounter>
                    <Counter
                        increment={() => increment(deviceInBasket.quantity_all)}
                        quantity={quantity}
                        decrement={decrement}
                    />
                </CoverCounter>

                <Price>{deviceInBasket.price} руб/шт.</Price>
                <SumCover>
                    <p>Итого: {sum} руб.</p>
                     {/*<PaymentSwitch
                        width={"70px"}
                        height={"30px"}
                    />*/}
                </SumCover>
            </GridBody>
            <BasketButtons
                quantity={quantity}
                id_user={deviceInBasket.id_user}
                id_order={deviceInBasket.id}
            />
        </Content>
    );
};

export default OrderInBasket;

const Content = styled.div`
`

const GridBody = styled.div`
    display: grid;
    gap: 0.5em;
    grid-template-columns: 0.15fr auto repeat(3, 0.2fr);
    align-items: center;
    grid-template-areas: "F D C P S";
    grid-auto-flow: row;

    @media (${baseTheme.maxMedia.laptop1024}) {
        grid-template-areas: "F D D D D"
                             ". . C P S";

        grid-template-rows: repeat(2, auto);
        margin-bottom: 20px;
    }

    @media (${baseTheme.maxMedia.tablet768}) {
        row-gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:"F D D"
                            "C P S";

    }
    @media(${baseTheme.maxMedia.mobile425}) {
        grid-template-areas:"F D D"
                            "C S S";
    }

`
const FotoDevice = styled.div`
    background-color: blanchedalmond;
    border: 1px solid black;
    position: relative;
    grid-area: F;

    &:after {
        content: "";
        display: block;
        padding-top: 100%;
    }
`

const Description = styled.div`
    grid-area: D;   
    
`

const CoverCounter = styled.div`
    grid-area: C;
    
`

const Price = styled.div`
    grid-area: P;
    text-align: center; 
    
    @media(${baseTheme.maxMedia.mobile425}) {   
        display: none;
    }
`
const SumCover = styled.div`
    grid-area: S;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

   //для PaymentSwitch
    & > div {
        position: absolute;
        top: 0;
        right: 0;
    }
`