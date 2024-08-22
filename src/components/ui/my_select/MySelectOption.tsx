import React, {FC} from 'react';
import styled from "styled-components";
import {OptionSrc} from "./mySeletcUtils";
import {baseTheme} from "../../../styles/theme";

export interface IOption {
    value: string,
    title: string
}

export interface ICustomOption {
    option: OptionSrc,
    dispatchValue: React.Dispatch<React.SetStateAction<string | OptionSrc>>
    controllerSelected: (selected: string| OptionSrc) => void
    selected: boolean

}


const MySelectOption: FC<ICustomOption> = (
    {
        option,
        dispatchValue,
        controllerSelected,
        selected
    }) => {

    const clickFunc = (option: OptionSrc) => {
        return function () {
            dispatchValue(option);
            controllerSelected(option)
        }
    }

    return (
        <Option
            className={selected ? "active" : " "}
            onClick={clickFunc(option)}
            value={option.value}>
            {option.title}
        </Option>
    );
};

export default MySelectOption;

const Option = styled.li`
    cursor: pointer;

    &.active {
        background-color: ${baseTheme.colors.selectLimit.option.active_bg}
    }
  &:hover:not(.active){
    background-color: ${baseTheme.colors.selectLimit.option.hover}
  }

`