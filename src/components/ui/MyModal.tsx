import React, {FC} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";
import {useCloseMiniModal} from "../../my_hooks/useCloseMiniModal";


export interface IMyModal {
    children: React.ReactNode
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    width?: string

}


const MyModal: FC<IMyModal> = ({
                                   children,
                                   setOpen,
                                   width,

                               }) => {

    const widthModal = width? width: "800px"

    const rootRev = useCloseMiniModal(setOpen)


    // @ts-ignore
    const childrenWidth: string = children[1]?.props?.width
        // @ts-ignore
        ? children[1].props?.width
        : "";

    return (
        <Cover >
            <Modal $width={childrenWidth ? childrenWidth : widthModal}>
                <Body ref={rootRev}>
                    {children}
                </Body>
            </Modal>
        </Cover>
    );
};

export default MyModal;

const Cover = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: ${baseTheme.colors.myModal.cover};
  z-index: 2;
`
const Modal = styled.div<{ $width: string }>`
  height: 100%;
  max-width: ${({$width}) => $width};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  background-color: ${baseTheme.colors.myModal.body_bg};
  width: 100%;
  padding: 20px;
  border-radius: 5px;
`