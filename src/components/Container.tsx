import React, {FC, ReactNode} from 'react';
import styled from "styled-components";
import {baseTheme, edgePx} from "../styles/theme";


interface IContainer {
    children: ReactNode
}

const Container: FC<IContainer> = ({children}) => {
    return (
        <Div>
            {children}
        </Div>
    );
};

export default Container;

const Div = styled.div`
    ${baseTheme.sizes.container};

        
  //????убрал по причине появления скрола по горизонту у слайдера 
  padding-left: ${edgePx};
  padding-right: ${edgePx};
    
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    //иначе модалка корзины улетит вправо
    position: relative;

`