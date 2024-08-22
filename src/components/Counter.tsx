import React, {FC} from 'react';
import styled from "styled-components";

interface ICounter{

    quantity: number;
    increment: () => void
    decrement: ()=> void


}

const Counter:FC<ICounter> = (
    {quantity, increment, decrement}) => {

    return (
        <BodyDiv>
            <button onClick={decrement}>---</button>
            <p>{quantity}</p>
            <button onClick={increment}>-|-</button>
        </BodyDiv>
    );
};

export default Counter;

const BodyDiv = styled.div`
  
  display: flex;
  justify-content: center;  
  align-items: center;
  flex-wrap: nowrap;
  
  & p,
  & button{
    text-align: center;
    flex-basis: 3em;
    
  }

  & button {    
    font-weight: lighter;
    height: 3em;
  }  
`