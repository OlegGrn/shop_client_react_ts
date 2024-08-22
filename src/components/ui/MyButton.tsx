import React, {FC, ReactNode} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface IMyButton {
    funcClick?: any,
    value: string | ReactNode
    id?: string
    noFocus?: boolean  //true = если не нужна анимация при focus and blur
    noClick?: boolean
}


const MyButton: FC<IMyButton> = ({
                                     funcClick,
                                     value,
                                     id,
                                     noFocus,
                                     noClick
                                 }) => {

    function focus(noFocus: boolean | undefined) {
        return function (event: React.FocusEvent) {
            return (!noFocus && event.target.classList.add("focus"))
        }
    }

    function blur(noFocus: boolean | undefined) {
        return function (event: React.FocusEvent) {
            return (!noFocus && event.target.classList.remove("focus"))
        }
    }

    /* function mouseLeave(event: any) {
         event.target.classList.remove("focus")
     }*/
    /* function mouseEnter(event: any) {
             event.target.classList.add("focus")
         }*/
    function mouseLeave(noFocus: boolean | undefined) {
        return function (event: any) {
            return (!noFocus && event.target.classList.remove("focus"))
        }
    }
    function mouseEnter(noFocus: boolean | undefined) {
        return function (event: any) {
            return (!noFocus && event.target.classList.add("focus"))
        }
    }

    return (
        <Button
            $noFocus={noFocus}
            onMouseLeave={mouseLeave(noFocus)}
            onMouseEnter={mouseEnter(noFocus)}
            onFocus={focus(noFocus)}
            onBlur={blur(noFocus)}
            onClick={!noClick?funcClick: null}
            id={id}
        >
            {value}
        </Button>
    );
};

export default MyButton;

const Button = styled.button<{ $noFocus: boolean | undefined }>`
  width: 100%;

  border-color: transparent;
  border-width: 3px;
  border-style: solid;

  font-size: 20px;
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 20px;

  color: ${({$noFocus}) => $noFocus
          ? baseTheme.colors.adminPanel.button.font_hover
          : baseTheme.colors.adminPanel.button.font};


  background-color: ${baseTheme.colors.adminPanel.button.bg};
  transition: color 0.2s ease-in 0s, border-color 0.2s ease-in 0s;
  white-space: nowrap;

  &:active,
  &.focus {
    border-color: ${({$noFocus}) => $noFocus
            ? "none"
            : baseTheme.colors.adminPanel.button.font};;
  }

  &:active {
    color: ${({$noFocus}) => $noFocus
            ? baseTheme.colors.adminPanel.button.font_hover
            : "white"};
  }

  &:hover:not(:active) {
    color: ${baseTheme.colors.adminPanel.button.font_hover};
  }

`