import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import {Context, ContextControllersModal, ContextWidth768} from "../contexts";
import {observer} from "mobx-react-lite";
import {baseTheme} from "../styles/theme";
import {slip} from "../styles/animation";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import BurgerMenu from "./BurgerMenu";

interface IWrapper{
    flag: boolean
}

const Wrapper: FC<IWrapper> = observer( ({flag}) => {
    console.log("render wrapper")

    const stores: any = useContext(Context);
    const burgerStore = stores.burger;
    let isActiveBurger: boolean = burgerStore.isActiveBurger();

    const width768 = useContext(ContextWidth768);
    const isWidth768: boolean | undefined = width768?.isWidth;

    const [openLogin, setOpenLogin] = useState(false)
    const [openBasket, setOpenBasket] = useState(false)

    return (
        <WrapperDiv id={"wrapper"} className={isActiveBurger? "slip": " "}>
            <ContextControllersModal.Provider value={{
                openLogin, openBasket, setOpenLogin, setOpenBasket
            }}>
                <Header/>
                {flag && <Main/>}
                <Footer/>
                {isWidth768 &&  <BurgerMenu/>}
            </ContextControllersModal.Provider>
        </WrapperDiv>
    );
});


export default Wrapper;

const WrapperDiv = styled.div`
    font-family: "Gotham", sans-serif;
    
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: max-content 1fr max-content;
    background-color: ${baseTheme.colors.wrapper.bg};
    transition: right 0.3s ease 0s;
    position: relative;
    right: 0;


    &.slip {    

        position: fixed;
        right: -80%;
        top: 0;
        animation: ${slip} 0.3s linear 1;

    }

`