import React, {FC} from 'react';
import styled from "styled-components";

export interface ICheckBox {
    name: string
    label: string | number,
    value: string | number,
    defaultChecked?: boolean
    price?: number
}

interface ICheckIn {
    checkin: ICheckBox
}

const CheckBox: FC<ICheckIn> = ({checkin}) => {

    const currentDefaultChecked = checkin.defaultChecked || false

    return (
        <Label>
            <Input
                defaultChecked={currentDefaultChecked}
                name={checkin.name}
                type={"checkbox"}
                value={checkin.value}
            />
            <span>{checkin.label}</span>
        </Label>
    );
};

export default CheckBox;

const Label = styled.label`
  & span {
    font-weight: 100;
  }
`;

const Input = styled.input`
`;