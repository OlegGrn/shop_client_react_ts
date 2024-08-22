import React, {useContext} from 'react';
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import AdminCustomSelect from "./ui/AdminCustomSelect";
import {baseTheme} from "../styles/theme";

const AdminAllSelect = observer(() => {
    const {types, categories, sizes} = useContext(Context)

    return (
        <BodyAllSelect>
            <AdminCustomSelect
                store={types}
                title={'Установленные типы:'}
            />
            <AdminCustomSelect
                store={categories}
                title={'Установленные категории:'}
            />
            <AdminCustomSelect
                store={sizes}
                title={'Установленные размеры:'}
            />
        </BodyAllSelect>
    );
});


export default AdminAllSelect;

const BodyAllSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 30px;
  
  @media (${baseTheme.maxMedia.laptop1024}){
    flex-direction: column;  
    align-items: stretch;
    
    
  }
  
  
`
