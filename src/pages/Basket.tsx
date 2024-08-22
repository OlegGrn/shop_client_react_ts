import React, {useContext} from 'react';
import {Context} from "../contexts";
import {IUserBasket} from "../store/basketStore";
import OrderInBasket from "../components/OrderInBasket";
import {observer} from "mobx-react-lite";
import styled from "styled-components";

export interface ITotalBasket {
    sum: number,
    orders: number[]
}


const Basket = observer(() => {


    const stores = useContext(Context);
    const baskets = stores.baskets;
    const goods: IUserBasket[] = baskets.userBasket;



    return (
        <section>
            {goods.length === 0
                ? <Title>Нет товаров в корзине</Title>
                : <ul>
                    {goods.map(item => {
                            if (!item.paid) {
                                return <Li key={item.id}>
                                    <OrderInBasket
                                        deviceInBasket={item}
                                    />
                                </Li>
                            }
                        }
                    )}
                </ul>
            }
        </section>
    );
});


export default Basket;

const Li = styled.li`
    padding: 1em 0;
`
const Title = styled.h1`
    font-size: 1.5em;
    padding-top: 1em;
    text-align: center;
`
