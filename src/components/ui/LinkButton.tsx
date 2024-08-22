import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface ILinkButton{
    text: string
    funcClick: any
}

const LinkButton:FC<ILinkButton> = ({text, funcClick}) => {
    return (
        <Link
            onClick={funcClick}
            href={"#"}>
            {text}
        </Link>
    );
};

export default LinkButton;

const Link =  styled.a`
  display: block;
  width: 100%;
  text-align: center;
  color: ${baseTheme.colors.productSelectInput.button.text};
  padding: 10px 30px;
  border-radius: 5px;
  background-color: ${baseTheme.colors.productSelectInput.button.bg};
`