import React, {FC, useRef, useState} from 'react';
import styled from "styled-components";
import MySelectList from "./MySelectList";
import {OptionSrc} from "./mySeletcUtils";
import {baseTheme} from "../../../styles/theme";

// Placeholder для заполнения значением по умолчанию: это пустое или нет
// При клике на Placeholder открывается список (isOpen = true),
// при клике на любом из MySelectOption список закрывается (isOpen = false),
// список так же закроется если кликнули за пределами списка
// и выбранное значение отображается в Placeholder и это значение можно получить


interface ISelect {
    list: OptionSrc[],
    placeholder?: string,
    funcChangeSelected?: (val: string) => void
    defValueLimit?: string
}

const MySelectApp: FC<ISelect> = (
    {
        list,
        placeholder,
        funcChangeSelected,
        defValueLimit
    }) => {

    console.log("render MySelectApp")

    let valuePlaceholder: string | OptionSrc = placeholder
        ? placeholder
        : defValueLimit ?? list[0]

    //состояние открытия селекта
    const [isOpen, setIsOpen] = useState(false);
    // значение выбранного селекта
    const [selected, setSelected]
        = useState<string | OptionSrc>(valuePlaceholder);

    function controllerSelected(selected: string | OptionSrc) {
        setIsOpen(prev => !prev)
        if (selected instanceof OptionSrc && funcChangeSelected !== undefined) {
            if(selected.value !== undefined){
                funcChangeSelected(selected.value)
            }
        }
    }

    const rootRef = useRef<HTMLDivElement>(null);
    const closeListOnClick = (event: MouseEvent) => {
        const {target} = event;
        console.log("click click click")
        if (target instanceof Node && !rootRef.current?.contains(target) && isOpen) {
            setIsOpen(false)
        }
    }

    return (
        <Wrapper ref={rootRef}
                 data-selected-value={selected instanceof OptionSrc && !isOpen
                     ? selected.value
                     : null
                 }
        >
            <Placeholder role={"button"} tabIndex={0}
                         className={selected instanceof OptionSrc
                             ? "selected"
                             : " "
                         }
                         onKeyDown={e => {
                             if (e.key === "Enter") {
                                 controllerSelected(selected)
                             }
                         }}
                         onFocus={(e) => e.target.classList.add("focus")}
                         onBlur={(e) => e.target.classList.remove("focus")}
                         onClick={() => setIsOpen(prev => !prev)}
            >
                <Content>
                    {selected instanceof OptionSrc
                        ? selected.title
                        : selected
                    }
                </Content>
                <Arrow className={isOpen ? "open" : " "}></Arrow>
            </Placeholder>


            {
                isOpen && <MySelectList
                    list={list}
                    selectedValue={selected}
                    dispatchValue={setSelected}
                    controllerSelected={controllerSelected}
                    closeListOnClick={closeListOnClick}
                />
            }
        </Wrapper>
    );
};

export default MySelectApp;

const Wrapper = styled.div`
  position: relative;
  font-size: 1rem;
`
const Content = styled.p`
    min-width: 2em;
  
`
const Arrow = styled.p`
  width: 0.6em;
  height: 0.6em;  
  border-left: 2px solid ${baseTheme.colors.selectLimit.placeholder.arrow};
  border-bottom: 2px solid ${baseTheme.colors.selectLimit.placeholder.arrow};
  transition: all 0.2s ease-in 0s;
  transform: translate(0, -20%) rotate(-45deg);

  &.open {
    transform: translate(0, 20%) rotate(135deg);
  }
`


const Placeholder = styled.div`

  border-width: 4px;
  border-style: solid;
  border-color: transparent;
  padding: 0.3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;
  transition: all 0.2s ease-in 0s;

  &.focus {
    border-color: ${baseTheme.colors.selectLimit.placeholder.focus};
  }

  background-color: ${baseTheme.colors.selectLimit.placeholder.bg};
  color: ${baseTheme.colors.selectLimit.placeholder.font};


`