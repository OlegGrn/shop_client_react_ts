import React, {FC, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {baseTheme} from "../styles/theme";
import EnterSvg from "../svg/EnterSVG";
import BasketSvg from "../svg/BasketSVG";
import Login1SVG from "../svg/Login1SVG";
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import AdminSvg from "../svg/AdminSVG";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE} from "../utils/consts";
import {usePrevSameClick} from "../my_hooks/usePrevSameClick";


interface ITopMenuRight {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenBasket: React.Dispatch<React.SetStateAction<boolean>>
}

const TopMenuRight: FC<ITopMenuRight> = observer((
    {
        setOpenLogin,
        setOpenBasket,
    }
) => {

    console.log("render TopMenuRight")

    const store: any = useContext(Context)
    const isAuth = store.user.isAuth()
    const isAdmin = store.user.isAdmin()

    const goods:[] = store.baskets.userBasket;
    const [quantityGoodsInBasket,
        setQuantityGoodsInBasket ] = useState<number>(goods.length)

    //пока не авторизован и при первом запуске payload = null => id undefined
    const id_user: number | undefined = store.user.getUser()?.id
    //при авторизации проверяем есть ли товары в БД по юзеру и сохраняем
    //результат в сторе
    useEffect(() => {
        if(id_user){
           console.log("сервер запрос store.baskets.getDataUser(id_user)")
           store.baskets.getDataUser(id_user).then(() => {
               let quantity: number = store.baskets.userBasket.length
               if (quantity) {
                   setQuantityGoodsInBasket(quantity)
               }
           })
        }
    }, [id_user])

    //обновляет состояние, когда id_user тоже, а товары добавились в корзину или удалились
    // и данные в сторе измемнились
    if(quantityGoodsInBasket == 0 && goods.length !== 0){
        //товары добавились
        setQuantityGoodsInBasket(goods.length)
    } else if(quantityGoodsInBasket !==0 && goods.length === 0){
        //товары удалились
        setQuantityGoodsInBasket(goods.length)
    }

    //для предотвращения клика на иконку, если мы уже на этой странице
    const clickTest = usePrevSameClick(setOpenBasket, BASKET_ROUTE)

    return (
        <Body>
            {
                isAdmin &&
                <CoverIcon $bg={baseTheme.colors.auth.bg}
                           $hover={baseTheme.colors.auth.hover}>
                    <Link to={ADMIN_ROUTE}>
                        <AdminSvg color={"#444"}/>
                    </Link>
                </CoverIcon>
            }

            <CoverIcon
                onClick={() => {
                    setOpenLogin(e => !e)
                }}
                $bg={baseTheme.colors.auth.bg}
                $hover={baseTheme.colors.auth.hover}
            >
                {isAuth ? <Login1SVG/> : <EnterSvg/>}
            </CoverIcon>
            <CoverIconBasket
                $quantity={quantityGoodsInBasket}
                onClick={clickTest}
                $bg={baseTheme.colors.basket.bg}
                $hover={baseTheme.colors.basket.hover}
            >
                <BasketSvg/>
            </CoverIconBasket>
        </Body>
    );
});

export default TopMenuRight;


const Body = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const CoverIcon = styled.div<{ $bg: string, $hover: string }>`
    width: 50px;
    height: 50px;
    background: ${props => props.$bg};
    border-radius: 10%;    
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.2s ease-in 0s;
    


    &:hover {
        //border-radius: 20%;
        background-color: ${props => props.$hover};
    }
`;

const CoverIconBasket = styled(CoverIcon)<{$quantity: number}>`
    &:after{
      content: "";      
      display: ${({$quantity}) => $quantity === 0? "none": "block"};     
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      background-color: red;
      border-radius: 50%;
      height: 1em;
      width: 1em;
    }
    
`

