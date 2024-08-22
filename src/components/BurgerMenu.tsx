import React, {useContext} from 'react';
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import TopMenuList from "./TopMenuList";
import {ID_MENU_LIST, MENU_LIST} from "../utils/consts";
import AsideBar from "./AsideBar";
import {baseTheme} from "../styles/theme";

const BurgerMenu = observer( () =>  {

    const stores = useContext(Context)
    const burgerStore = stores.burger;
    let isActiveBurger: boolean = burgerStore.isActiveBurger();


    return (
        <BodyDiv
            id={ID_MENU_LIST}
            className={isActiveBurger? "active": ""}
        >
            <TopMenuList menuList={MENU_LIST}/>
            <AsideBar/>
        </BodyDiv>
    );
});

export default BurgerMenu;

const BodyDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 80vw;
  background-color: ${baseTheme.colors.burgerMenu.bg};
  height: 100vh;
  overflow: scroll;
  z-index: -1;
    

`