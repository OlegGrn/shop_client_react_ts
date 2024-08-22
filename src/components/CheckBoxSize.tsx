import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import {enumSelect} from "../store/productStore";
import {Context} from "../contexts";
import {baseTheme} from "../styles/theme";


interface ICheckBoxSize {
    name: string
    value: number,
    label: string | number,
    select: enumSelect.size,
    state: boolean
    dispatch: React.Dispatch<boolean>


}


const CheckBoxSize: FC<ICheckBoxSize> =  (
    {
        name, label,
        value: itemId, select,
       state: clearChecked, dispatch: setClearChecked
    }) => {

    let storeProducts = useContext(Context).products;

    const [check, setChecked] = useState(false);
    function checkedInput(itemId: number) {
        return function () {
            setClearChecked(false)//перезапускаем setClearChecked, чтобы в
            // последующем работал checked
            setChecked(!check)
            //проверяем, если такой ID уже в SelectProduct
            let index = storeProducts.getSelectProduct()[select].indexOf(itemId)
            //функция добавить ID в SelectProduct, если его там не было (index > 0)
            storeProducts.setSelectProduct(select, itemId, index)
        }
    }

    //для очистки выбранных true checkbox => checked=false
    if(clearChecked) {
        if(check) {
            setChecked(false)
        }
    }

    return (
        <Label>
            <Input
                checked={check}
                name={name}
                type={"checkbox"}
                value={itemId}
                onChange={checkedInput(itemId)}
            />
            <CheckMark></CheckMark>
            <Title>{label}</Title>
        </Label>
    );
};

export default CheckBoxSize;

const Title = styled.span`
  font-weight: 100;
`
const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  user-select: none;
  cursor: pointer;
    @media (${baseTheme.maxMedia.tablet768}){
        gap: 20px;
        font-size: 20px;
    }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:hover + span {
    // hover над Input
    background-color: ${baseTheme.colors.checkBox.bg_hover};
  }
  &:checked + span {
    // checked над Input
    background-color: ${baseTheme.colors.checkBox.bg_checked};
    //показываем галку
    &:after {
      display: block;
    }
  }
`;

const CheckMark = styled.span`
  width: 25px;
  height: 25px;
  background-color: ${baseTheme.colors.checkBox.bg};
  border-radius: 3px;
  position: relative;

    @media (${baseTheme.maxMedia.tablet768}){
        width: 40px;
        height: 40px; 
        border: 1px solid black;
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