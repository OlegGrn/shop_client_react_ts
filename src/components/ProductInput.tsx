import React, {FC} from 'react';
import styled from "styled-components";



interface IProductInput{
    label: string
    name: string,
    type: string,
    placeholder?: string
    textArea?: boolean
    valid?: boolean

}

const ProductInput:FC<IProductInput> = (
    {label, name, type, valid,
        placeholder, textArea}
) => {

    console.log('valid = ' + valid)
    return (
        <div>
            <label>
                <span>{label}: </span>
                {textArea
                ?  <TextArefValid
                        name={name}
                        placeholder={placeholder}
                        $valid={valid !== undefined? valid: true}
                    ></TextArefValid>
                : <InputValid  name={name}
                               type={type}
                               placeholder={placeholder}
                               $valid={valid !== undefined? valid: true}
                    />
                }
            </label>
        </div>
    );
};

const InputValid = styled.input<{$valid: boolean}>`
    background-color: ${({$valid}) => $valid? null: "rgba(236,184,184,0.98)" } ;
`

const TextArefValid = styled.input<{$valid: boolean}>`
    background-color: ${({$valid}) => $valid? null: "rgba(236,184,184,0.98)" } ;
`

export default ProductInput;





