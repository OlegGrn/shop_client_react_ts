import React, {FC, ReactNode} from 'react';
import styled from "styled-components";

interface IH2 {
    children: ReactNode | string
    font_size?: number
    color?: string
    textAlign?: string
}

const Label: FC<IH2> = (
    {
        children,
        font_size,
        color,
        textAlign
    }) => {


    return (
        <H2
            $size={font_size ? font_size : 20}
            $color={color ? color : "inherit"}
            $textAlign={textAlign? textAlign: "inherit"}
        >
            {children}
        </H2>
    );
};

export default Label;

const H2 = styled.p<{
    $size: number,
    $color: string,
    $textAlign: string
}>`
    font-size: ${(props) => props.$size}px;
    color: ${({$color}) => $color};
    font-weight: 500;
    text-align: ${({$textAlign}) => $textAlign};


`;
