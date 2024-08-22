import React, {useContext} from 'react';
import styled from "styled-components";
import TopMenuLogo from "./TopMenuLogo";
import TopMenuList from "./TopMenuList";
import BurgerController from "./BurgerController";
import TopMenuRight from "./TopMenuRight";
import NavModal from "./NavModal";
import {MENU_LIST} from "../utils/consts";
import {Context, ContextControllersModal, ContextWidth768} from "../contexts";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {

    console.log("render NavBar")

    let {
        openLogin, openBasket,
        setOpenLogin, setOpenBasket
    } = useContext(ContextControllersModal)

    const width768 = useContext(ContextWidth768)
    const isWidth768: boolean | undefined = width768?.isWidth

    const stores: any = useContext(Context);
    const burgerStore = stores.burger;
    let isActiveBurger: boolean = burgerStore.isActiveBurger();

    //для закрытия открытого бургера при увеличении ширины более 768
    // (в консоль при этом ошибка!!!)
    if (!isWidth768 && isActiveBurger) burgerStore.click()

    return (
        <Nav>
            {isWidth768 && <BurgerController/>}
            {!isWidth768 && <TopMenuLogo/>}
            {!isWidth768 && <BlockMenu
                className={isActiveBurger ? "slip" : " "}
            >
                <TopMenuList menuList={MENU_LIST}/>
            </BlockMenu>}

            <div>
                <TopMenuRight
                    setOpenLogin={setOpenLogin}
                    setOpenBasket={setOpenBasket}/>
            </div>

            {(openLogin || openBasket) &&
                <NavModal
                    openLogin={openLogin}
                    openBasket={openBasket}
                    setOpenLogin={setOpenLogin}
                    setOpenBasket={setOpenBasket}/>
            }
        </Nav>
    );
});

export default NavBar;

const Nav = styled.nav`
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 20px;
    white-space: normal;
    justify-content: space-between;

`;

const BlockMenu = styled.div`
    flex: 1 1 auto;
`;






