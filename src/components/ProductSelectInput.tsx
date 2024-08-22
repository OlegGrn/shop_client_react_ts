import React, {FC, useState} from 'react';
import MySelecting from "./ui/MySelecting";
import styled from "styled-components";
import {baseTheme} from "../styles/theme";
import {INameId} from "../http/http_services/basicHttpService";
import LinkButton from "./ui/LinkButton";

interface IProductSelectInput {
    data: INameId[] | []
    nameSelect: string
    nameInput: string
    typeInput: string
    labelSelect: string
    labelInput: string
    valid: boolean


}

const ProductSelectInput: FC<IProductSelectInput> = (
    {
        data, valid,
        typeInput, nameSelect,
        nameInput, labelSelect, labelInput
    }
) => {

    const [arr, setArr] = useState([1])


    return (

        <BodyFlex>
            <label>
                <span>{labelSelect}: </span>
                <MySelecting name={nameSelect} data={data}/>
            </label>
            <label>
                <span>{labelInput}: </span>
                <InputValid name={nameInput}
                            type={typeInput}
                            $valid={valid}
                />
            </label>
        </BodyFlex>
    );
};

export default ProductSelectInput;

const InputValid = styled.input<{ $valid: boolean }>`
  background-color: ${({$valid}) => $valid ? null : "rgba(236,184,184,0.98)"};
`
const BodyFlex = styled.div` 
    display: flex;
    justify-content: space-between;

    label {
        select {
            padding: 5px;
            font-size: 20px;
        }


    }

`