import React, {FC, useState} from 'react';
import MySwitch from "./ui/MySwitch";
import styled from "styled-components";



interface IPaymentSwitch{
    width: string,
    height: string,
}

const PaymentSwitch:FC<IPaymentSwitch> = (
    { width, height}
) => {

    const [isChecked, setIsChecked] = useState(true)
   function onChange(e:any){
       setIsChecked(e.target.checked)
   }

    return (
        <BodyDiv>
            <p>Оплатить: </p>
            <MySwitch
                funcOnChange={onChange}
                isChecked={isChecked}
                name={"test"}
                width={width}
                height={height}
                colorFont={"rgba(38, 39, 41, 0.7)"}
            />
        </BodyDiv>
    );
};

export default PaymentSwitch;

const BodyDiv = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  gap: 10px;
  
`


