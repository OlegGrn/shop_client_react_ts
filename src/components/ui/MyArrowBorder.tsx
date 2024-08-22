import React, {FC} from 'react';
import styled from "styled-components";

interface IMyArrowBorder {
    direction: string;
    widthCircle: string,
    widthArrow: string
    moveOnePage:any

}

const MyArrowBorder: FC<IMyArrowBorder> = (
    {direction,widthCircle, widthArrow, moveOnePage}
) => {
    return (
        <BodyArrow
            onClick={moveOnePage}
            $widthCircle={widthCircle}>
            <Arrow
                className={direction}
                $widthArrow={widthArrow}>
            </Arrow>
        </BodyArrow>
    );
};

export default MyArrowBorder;

const BodyArrow = styled.p<{$widthCircle: string}>`
  font-size: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
  width:${({$widthCircle}) => $widthCircle};
  height: ${({$widthCircle}) => $widthCircle};
  //background-color: lightgray;
  border-radius: 25%;
  cursor: pointer;
`

const Arrow = styled.span<{ $widthArrow: string }>`
  display: inline-block;
  font-size: 0;
  width:${({$widthArrow}) => $widthArrow};
  border-bottom: 2px solid black;
  border-left: 2px solid black; 

  &:before {
    content: "";
    display: inline-block;
    width: 100%;
    padding-top: 100%;
    
  }
  &.prev{
    transform: translate(25%, 0%) rotate(45deg) ;
  }

  &.next{
    transform: translate(-25%, 0%) rotate(-135deg) ;
      
  }
  


`

