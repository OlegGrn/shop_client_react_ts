import React, {FC} from 'react';
import {baseTheme} from "../../styles/theme";
import styled from "styled-components";
import Loading from "../Loading";
import {observer} from "mobx-react-lite";
import ProductStore from "../../store/productStore";
import BaseStore from "../../store/common_class/BaseStore";


interface IMyTitleForm {
    content: string,
    store?: ProductStore | BaseStore
    font_size?: number
}


const MyTitleForm: FC<IMyTitleForm> = observer((
    {content, store, font_size}
) => {

    let loading: boolean = store?.isLoading() || false

    return (
        <Title $font_size={font_size ? font_size : 30}>{loading
            ? <Loading/>
            : content}</Title>
    );
});

export default MyTitleForm;

const Title = styled.h2<{ $font_size: number }>`
  text-align: center;
  font-size: ${({$font_size}) => $font_size}px;
  color: ${baseTheme.colors.adminForm.title};
`