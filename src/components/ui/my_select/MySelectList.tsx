import React, {FC, useEffect, useRef} from 'react';
import MySelectOption from "./MySelectOption";
import styled from "styled-components";
import {OptionSrc} from "./mySeletcUtils";
import {baseTheme} from "../../../styles/theme";

interface ICustomListOptions {
    list: OptionSrc[];
    selectedValue: string | OptionSrc
    dispatchValue: React.Dispatch<React.SetStateAction<string | OptionSrc>>
    controllerSelected: (selected: string | OptionSrc) => void;
    closeListOnClick: (e:MouseEvent) => void


}

const MySelectList: FC<ICustomListOptions> = (
    {
        list,
        selectedValue,
        dispatchValue,
        controllerSelected,
        closeListOnClick
    }) => {

    //Получаем индекс выбранного Option или 0. В последствии по этому индексу подсвечиваем элемент
    let indexSelected = selectedValue instanceof OptionSrc
        ? list.findIndex(({value}) => value === selectedValue.value)
        : 0;

    const rootRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        document.addEventListener('click', closeListOnClick)
        document.addEventListener("keydown", listenKeyboard)
        return () => {
            document.removeEventListener("keydown", listenKeyboard)
            document.removeEventListener('click', closeListOnClick)
        }
    }, [])

    // перебор селекта стрелками и его закрытие
    const lengthList: number = list.length
    function listenKeyboard(e: KeyboardEvent) {
        //закрываем селект по Escape и  Tab
        if (e.code === "Escape" || e.code === "Tab") {
            //и передаем активный IOption, который находим по indexSelected в list
            controllerSelected(list[indexSelected])
        }
        if (e.code === "ArrowUp" && indexSelected > 0) {
            e.preventDefault()
            //рендерим весь MySelectApp с новым значением выбранного селекта
            dispatchValue(list[--indexSelected]) //вот так indexSelected - 1 = НЕ делать
        } else if(e.code === "ArrowDown" && indexSelected < lengthList - 1) {
            e.preventDefault()
            //рендерим весь MySelectApp с новым значением выбранного селекта
            dispatchValue(list[++indexSelected]) //вот так indexSelected + 1 = НЕ делать
        } else {
            e.preventDefault()
            return
        }
    }

    return (
        <List ref={rootRef}>
            {list.map((option, currentIndex) => <MySelectOption
                    key={option.value}
                    option={option}
                    dispatchValue={dispatchValue}
                    controllerSelected={controllerSelected}
                    selected={currentIndex === indexSelected}
                />
            )}
        </List>
    );
};

export default MySelectList;

const List = styled.ul`
    
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: ${baseTheme.colors.selectLimit.list.border};
    background-color: ${baseTheme.colors.selectLimit.list.bg};
    
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
  
    z-index: 2;

    li {
        padding: 5px 3px;

        &:not(:last-child) {
            
        }
    }
`