import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";

interface IMyCheckBox {
    name: string
    value: number | string,
    label?: string | number

}


const MyCheckBox: FC<IMyCheckBox> = (
    {
        name, label,
        value,
    }) => {

    return (
        <Label>
            <Input
                name={name}
                type={"checkbox"}
                value={value}
            />
            <CheckMark></CheckMark>
            {label && <span>{label}</span>}
        </Label>
    );
};

export default MyCheckBox;


const Label = styled.label`
  width: 100%;
  height: 100%; 
  position: relative;  
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:hover + span {
    &:before{
      // hover над Input
      background-color: ${baseTheme.colors.checkBox.bg_hover};
    }    
  }
  &:checked + span {
    &:before{
      // checked над Input
      background-color: ${baseTheme.colors.checkBox.bg_checked_blue};
    }    
    //показываем галку
    &:after {
      display: block;
    }
  }
  
`;

const CheckMark = styled.span`
  width: 100%; 
  position: relative; 
  
  &:before{
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;  
    background-color: ${baseTheme.colors.checkBox.bg};
    border-radius: 3px;
  }
   
    // галка    
    &:after {
    content: "";
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;

    width: 30%;
    height: 60%;
    border: solid ${baseTheme.colors.checkBox.mark};
    border-width: 0 3px 3px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }

`