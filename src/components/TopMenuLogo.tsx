import React from 'react';
import styled from "styled-components";
import {baseTheme} from "../styles/theme";



const TopMenuLogo = () => {
    return (
        <Div>
            Бренд
        </Div>
    );
};

export default TopMenuLogo;

const Div = styled.div`
    font-size: 20px;
    font-weight: bold;
    width: 100px;
    height: 100px;
    border-radius: 20%;
    overflow: hidden;
    background: ${baseTheme.colors.logo.bg};

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: all 0.2s linear 0s;

    &:hover {
        //color: #a8a1a1;
        border-radius: 35%;
    }

`