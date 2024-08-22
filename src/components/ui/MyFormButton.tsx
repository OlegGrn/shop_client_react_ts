import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface IMyFormButton{
    children: string

}

const MyFormButton:FC<IMyFormButton> = ({children}) => {
    return (
        <Button >{children}</Button>

    );
};

export default MyFormButton;


const Button = styled.button`
  color: ${baseTheme.colors.myFormButton.color};
  display: block;
  width: 100%;
  height: 70px;
  background-color: ${baseTheme.colors.myFormButton.bg};
  border-radius: 5px;
  font-size: 30px;

  @media (max-width: 425px) {
    font-size: 20px;
  }
`