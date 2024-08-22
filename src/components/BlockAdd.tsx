import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyTitleForm from "./ui/MyTitleForm";
import MyFormButton from "./ui/MyFormButton";
import styled from "styled-components";
import {SubmitBlock} from "../utils/submitBlock";
import BaseStore from "../store/common_class/BaseStore";
import AdminStore from "../store/adminStore";


interface IBlockAdd {
    store: BaseStore | AdminStore
    label: string,
    width?: string
    typeInput?: string
    regExp?: RegExp
    placeholder?: string
}

const BlockAdd: FC<IBlockAdd> = observer((
    {
       store, label, typeInput,
        regExp, placeholder
    }) => {

    const [valid, setValid] = useState(true)
    const [title, setTitle] = useState(
        `Добавить ${label.toLowerCase()}`)

    let submit = SubmitBlock.addOne({
        valid, setValid, setTitle, store, label, typeInput, regExp
    })

    return (
        <BodyForm  onSubmit={submit}>
            <MyTitleForm content={title} store={store}/>
            <Input
                name={"name"}
                type={typeInput ? typeInput : "text"}
                placeholder={placeholder? placeholder: label}
                $valid={valid}/>
            <MyFormButton>Отправить</MyFormButton>
        </BodyForm>
    );
});

export default BlockAdd;

const BodyForm = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  row-gap: 27px;`

const Input = styled.input<{ $valid: boolean }>`
  font-size: 30px;
  padding-left: 10px;
  height: 70px;
  width: 100%;
  background-color: ${({$valid}) => !$valid ? "rgb(248,202,202)" : null};
`




