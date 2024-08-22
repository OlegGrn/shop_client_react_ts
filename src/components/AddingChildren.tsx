import React, {FC, useState,} from 'react';
import LinkButton from "./ui/LinkButton";
import styled from "styled-components";

interface IProductAddInput {
    children: React.ReactNode
    limit?: number

}

const AddingChildren: FC<IProductAddInput> = (
    {children, limit}) => {

    const [count, setCount] = useState<number>(1)
    let arr = new Array(count).fill("I")

    const add = () => {
        if (limit) {
            (count < limit) && setCount((count + 1))
        } else {
            setCount((count + 1))
        }
    }
    const del = () => {
        if (count > 1) {
            setCount((count - 1))
        }
    }

    return (
        <Body>
            {arr.map(() => children)}
            <CoverLinkButton>
                <LinkButton text={"Добавить"} funcClick={add}/>
                <LinkButton text={"Удалить"} funcClick={del}/>
            </CoverLinkButton>
        </Body>
    );
};

export default AddingChildren;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5em;
`

const CoverLinkButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
`


