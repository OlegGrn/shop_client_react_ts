import React, {FC, ReactNode} from 'react';
import styled from "styled-components";
import MyButton from "./MyButton";

interface IMyButton {
    children: string | ReactNode
    funcClick?: any
}

const CoverButton: FC<IMyButton> = (props) => {

    return (
        <BodyButton>
            <MyButton value={props.children} funcClick={props.funcClick}/>
        </BodyButton>

    );
};

export default CoverButton;

const BodyButton = styled.div`
    text-align: center;
    min-height: 40px;
    display: grid;
`;

