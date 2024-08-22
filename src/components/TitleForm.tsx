import React, {FC, useContext} from 'react';
import {Context} from "../contexts";
import styled from "styled-components";
import {baseTheme} from "../styles/theme";
import Loading from "./Loading";

interface ITitleForm {
    resMessage: string,
    authType: boolean
}

const TitleForm: FC<ITitleForm> = ({authType, resMessage}) => {
    const store = useContext(Context)
    const loading = store.user.isLoading()



    return (
        <>
            {resMessage?.length > 0
                ? <Title>{resMessage}</Title>
                : <Title>{loading
                    ? <Loading/>
                    : <span>{authType ? "Вход" : "Регистрация"}</span>}
                </Title>
            }
        </>
    );
};

////////////////// STYLE ////////////////////////////////////////////////////////////
export default TitleForm;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  color: ${baseTheme.colors.formAuth.font};
`



