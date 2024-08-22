import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface IMyList {
    width: string;
    height: string;
    lines: number;
    dispatch: React.Dispatch<boolean>
    state: boolean
}

const MyListIcon: FC<IMyList> = (
    {
        width, height, lines,
        dispatch: setIsTile, state: isTile
    }
) => {

    function click() {
        if (!isTile) return
        setIsTile(false)
    }

    return (
        <Body className={isTile ? " " : "active"}
              onClick={click} $width={width} $height={height}>
            {Array(lines)
                .fill(0)
                .map((_, ind) => <PointLine
                    className={isTile ? " " : "active"}
                    key={ind}></PointLine>)}
        </Body>
    );
};

export default MyListIcon;

const Body = styled.button<{ $width: string, $height: string }>`

    display: grid;
    align-content: space-between;
    height: ${({$height}) => $height};
    width: ${({$width}) => $width};
    background: ${baseTheme.colors.myIcon.bg};
    transition: all 0.2s ease-in 0s;

    padding: 5%;
    &.active{
        background-color: ${baseTheme.colors.myIcon.bg_active};
    }
    &:hover:not(.active){
        p:before,
        p:after{
            background-color: ${baseTheme.colors.myIcon.line_hover};
        }
    }
`

const PointLine = styled.p`

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    

    &:before {
        content: "";
        display: block;
        width: 3px;
        height: 3px;
        background-color: ${baseTheme.colors.myIcon.line};       
        border-radius: 35%;
    }

    &:after {
        content: "";
        display: block;
        flex: 1 1 auto;
        height: 1px;
        background-color: ${baseTheme.colors.myIcon.line};
    }
    &.active:after,
    &.active:before{
        background-color: ${baseTheme.colors.myIcon.line_active};
    }
    
    
`
