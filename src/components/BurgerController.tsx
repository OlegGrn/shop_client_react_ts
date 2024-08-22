import React, {useContext} from 'react';
import styled from "styled-components";
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import BurgerMenu from "./BurgerMenu";


const BurgerController = observer(() => {

    console.log("render burger")

    const stores = useContext(Context);
    const burgerStore = stores.burger;
    let isActiveBurger: boolean = burgerStore.isActiveBurger();


    const clickBurger = () => {
        burgerStore.click()
    }

    return (
        <>
            <Div className={isActiveBurger ? "slip" : " "}
                 onClick={() => clickBurger()}>
                <span></span>
            </Div>
        </>

    );
});

export default BurgerController;


const Div = styled.div.attrs(() => ({
    id: "burger"
}))`
  position: relative;
  z-index: 5;
  display: block;
  width: 30px;
  height: 18px;
  cursor: pointer;

  &::before,
  &::after,
  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    transition: all 0.3s ease 0s;
    background-color: white;
  }

  &::before {
    content: "";
    top: 0;
  }

  span {
    bottom: 50%;
    transform: scale(1) translate(0, 50%);
  }

  &::after {
    content: "";
    bottom: 0;
  }

  &.slip {
    span {
      transform: scale(0);
    }

    &::before {
      top: 50%;
      transform: translate(0, -50%) rotate(45deg);
    }

    &::after {
      bottom: 50%;
      transform: translate(0, 50%) rotate(-45deg)
    }
  }

`