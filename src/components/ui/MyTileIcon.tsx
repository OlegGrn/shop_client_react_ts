import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface IMyTile {
    width: string;
    columns: number
    dispatch: React.Dispatch<boolean>
    state: boolean


}

const MyTileIcon: FC<IMyTile> = (
    {
        width, columns,
        dispatch: setIsTile, state: isTile
    }) => {

    function click() {
        if (isTile) return
        setIsTile(true)
    }

    return (
        <Body
            className={isTile? "active": " "}
            onClick={click}
            $quantity={columns}
            $width={width}
        >
            {Array(columns * columns)
                .fill(0)
                .map((item, ind) => <Tile
                    key={ind}></Tile>)
            }
        </Body>
    );
};

export default MyTileIcon;

const Body = styled.button<{ $quantity: number, $width: string }>`
    display: inline-grid;
    grid-template-columns: repeat(${({$quantity}) => $quantity}, 1fr);
    grid-auto-flow: row;
    width: ${({$width}) => $width};
    height: ${({$width}) => $width};
    justify-content: space-between;
    align-content: space-between;
    background-color: ${baseTheme.colors.myIcon.bg};  
    padding: 5%;
    transition: all 0.2s ease-in 0s;

    border-color:${baseTheme.colors.myIcon.line};
    
    &.active{
        background-color: ${baseTheme.colors.myIcon.bg_active};
        border-color: ${baseTheme.colors.myIcon.line_active};
    }  
    
    &:hover:not(.active){
        border-color: ${baseTheme.colors.myIcon.line_hover};
    }






`
const Tile = styled.p`
    width: 90%;
    border-width: 1px;
    border-style: solid;   
    border-color: inherit;
    border-radius: 25%;

    &:after {
        content: "";
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding-top: 100%;
    }
    
    
    
    
`