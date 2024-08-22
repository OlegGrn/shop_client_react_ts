import React, {FC, ReactNode, useState} from 'react';
import Title from "./ui/Label";
import styled from "styled-components";
import MyModal from "./ui/MyModal";
import DoubleButton from "./DoubleButton";
import {baseTheme} from "../styles/theme";

interface IBlockAdmin{
    title: string
    children: ReactNode[];


}


const ControllerModal:FC<IBlockAdmin> = (
    {children,title}
) => {
    const [open, setOpen] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);



    return (
        <BodyBlock>
            <Title font_size={20} textAlign={"start"}>{title}</Title>
            <DoubleButton setOpen={setOpen} setAdding={setAdding}/>
            {open &&
                <MyModal
                   setOpen={setOpen}
                > {adding
                    ? children[0]
                    : children[1]
                }
                </MyModal>
            }
        </BodyBlock>
    );
};

export default ControllerModal;

const BodyBlock = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  //grid-template-rows: 40px;
  column-gap: 40px;
  align-items: center;

  & p:first-child {
    min-width: 200px;
    font-weight: bold;
  }
  
  @media (${baseTheme.maxMedia.laptop1024}){
    grid-template-columns: 1fr;
    row-gap: 10px;
    
    grid-template-rows: max-content max-content;
    
    
  }
`

