import React, {FC, useContext} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {baseTheme} from "../styles/theme";
import {Context} from "../contexts";

interface IBasketIN {
    path: string,
}


const BasketIN: FC<IBasketIN> = ({path}) => {

    const baskets = useContext(Context).baskets
    let userGoods = baskets.userBasket
    let sum: number = userGoods.reduce((sum, item) => {
        sum += item.price*item.quantity_chosen
        return sum
    }, 0)

    return (
        <Body>
            {
                sum === 0
                    ? <h3>Корзина пуста</h3>
                    : <>
                        <h3>В корзине на сумму: </h3>
                        <Sum>{sum}<span> рублей</span></Sum>
                        <Link to={path}><Span>В корзину</Span> </Link>
                    </>
            }


        </Body>
    );
};

export default BasketIN;

const Body = styled.div`
    font-size: 20px;
    padding: 20px 10px;
    width: 100%;
    min-width: 200px;
    color: ${baseTheme.colors.bannerBasket.font};
    
    h3{
        text-align: center;
    }

    a {
        display: flex;
        padding: 1em 0.3em 0.3em 0.3em;
        justify-content: center;


    }
`

const Sum = styled.p`
    padding: 0.3em;
    font-weight: bolder;
    text-align: center;
    color: ${baseTheme.colors.bannerBasket.sum};
`

const Span = styled.span`
    color: ${baseTheme.colors.bannerBasket.font};

    &:hover {
        color: ${baseTheme.colors.bannerBasket.hover};
    }




`