import React, {FC} from 'react';
import styled from "styled-components";

interface IBannerDef{
    title: string
}

const BannerDef:FC<IBannerDef> = ({title}) => {
    return (
        <Body>
            <Title>{title}</Title>
        </Body>
    );
};

export default BannerDef;

const Title = styled.h2`
    font-size: 60px;
    max-height: 25vh;
    height: 100%;
    display: flex;
    align-items: end;
`

const Body = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;    
    align-items: start;
`