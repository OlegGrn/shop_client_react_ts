import React, {FC, ReactNode} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../styles/theme";
import {useCloseMiniModal} from "../../my_hooks/useCloseMiniModal";


export interface IMyMiniModal {
    children: ReactNode
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const MyMiniModal: FC<IMyMiniModal> = ({
                                           children,
                                           setOpen,
                                       }) => {

    const rootRef = useCloseMiniModal(setOpen)

    return (
        <MiniModal ref={rootRef}>
            {children}
        </MiniModal>
    );
};

export default MyMiniModal;

const MiniModal = styled.div`
  position: absolute;
  right: 0;;
  bottom: 0;
  border-radius: 3px;
  transform: translateY(100%);
  min-width: 200px;
  background-color: ${baseTheme.colors.miniModal.body.bg};
  z-index: 1;
`




