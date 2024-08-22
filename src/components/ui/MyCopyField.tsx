import React, {FC, useCallback} from 'react';
import CopySVG from "../../svg/CopySVG";
import styled from "styled-components";
import CheckSVG from "../../svg/CheckSVG";
import useCopyToClipboard from "../../my_hooks/useCopyToClipboard";
import {baseTheme} from "../../styles/theme";

interface IMyCopyField {
    value: string
}

const MyCopyField: FC<IMyCopyField> = ({value}) => {

    const [isCopied, coping] = useCopyToClipboard(value)

    function clickCoping(isCopied: boolean, coping:(ms: number) => Promise<void>){
        return async function (){
            if (isCopied) return
            await coping(1000)
        }
    }

    return (
        <Body>
            <Content>{value}</Content>
            <ButtonIcon
                className={isCopied? "copied": "none"}
                $isCopied={isCopied}
                onClick={clickCoping(isCopied, coping)}
            > {
                isCopied
                    ?<CheckSVG/>
                    :<CopySVG/>
            }
            </ButtonIcon>
        </Body>
    );
};

export default MyCopyField;

const Body = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2em;
    gap: 0.8em;
  @media(${baseTheme.maxMedia.laptop1024}){
    gap: 0;
  }
    
`

const Content = styled.p`
  padding: 0.5em;
  background-color: rgba(0, 0, 0, 0.71);
  border-radius: 0.3em;
  color: white;
  min-width: 600px;
  @media(${baseTheme.maxMedia.laptop1024}){
    min-width: auto;
    width: 100%;
    word-break: break-word;
    
  }
  



`
const ButtonIcon = styled.button<{$isCopied: boolean}>`
    font-size: inherit;
    background-color: transparent;
    position: relative;

    &:before {
        content: "Копировать";
        font-size: 0.8em;
        color: white;
        background-color: black;
        padding: 0.2em;
        border-radius: 0.3em;
        position: absolute;
        top: -0.3em;
        left: 0;
        transform: translateY(-100%);
        opacity: 0;
        transition: opacity 0.3s ease-out 0s;
        pointer-events: none;
    }

    &.copied:before {
        content: "Скопирован";
    }

    &:hover:before {
        opacity: 1;
    }
  
    @media(${baseTheme.maxMedia.laptop1024}){
      display: none;
    }
  
  
`