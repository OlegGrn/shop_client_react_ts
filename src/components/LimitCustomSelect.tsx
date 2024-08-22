import React, {FC} from 'react';
import MySelectApp from "./ui/my_select/MySelectApp";
import {madeListLimit} from "./ui/my_select/mySeletcUtils";
import styled from "styled-components";


interface ILimitCustomSelect {

    list: number[]
    funcChangeSelected: any,
    placeholder?: string,
    defValueLimit?: string
}

const LimitCustomSelect: FC<ILimitCustomSelect> = (
    {
        list,
        defValueLimit,
        funcChangeSelected,
        placeholder
    }
) => {

    let newList = madeListLimit(list)

    return (
        <BodyDiv>
            <label>Показывать товаров: </label>
            <MySelectApp
                list={newList}
                funcChangeSelected={funcChangeSelected}
                placeholder={placeholder}
                defValueLimit={defValueLimit}
            />
        </BodyDiv>
    );
};

export default LimitCustomSelect;

const BodyDiv = styled.div`
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 10px;   
    align-content: space-between;
    align-items: center;

    & > div {
        align-self: start;
    }

`