import React, {FC} from 'react';
import MyButton from "./ui/MyButton";
import styled from "styled-components";
import {baseTheme} from "../styles/theme";

interface IDoubleButton {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setAdding: React.Dispatch<React.SetStateAction<boolean>>
}

const DoubleButton: FC<IDoubleButton> = (
    {setOpen, setAdding}) => {


    const ADD_VALUE: string = "Добавить";
    const DEL_VALUE: string = "Удалить";

    function click(event: any) {
        const {target} = event
        if (target.textContent === ADD_VALUE) {
            setAdding(true)
        } else {
            setAdding(false)
        }
        setOpen(true)
    }


    return (
        <Double>
            <MyButton funcClick={click} value={ADD_VALUE}/>
            <MyButton funcClick={click} value={DEL_VALUE}/>
        </Double>
    );
};

export default DoubleButton;


const Double = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  height: 100%;
  min-width: 600px;

  @media (${baseTheme.maxMedia.tablet768}) {
    grid-template-columns: 1fr;
    row-gap: 5px;
    min-width: auto;

  }
`