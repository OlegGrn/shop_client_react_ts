import React, {useContext} from 'react';
import Title from "../components/ui/Label";
import styled from "styled-components";
import AdminAllSelect from "../components/AdminAllSelect";
import {Context, ContextWidth768} from "../contexts";
import ControllerModal from "../components/ControllerModal";
import ProductAdd from "../components/ProductAdd";
import ProductDelete from "../components/ProductDelete";
import BlockAdd from "../components/BlockAdd";
import BlockDelete from "../components/BlockDelete";
import {regCategory, regEmail, regTypes} from "../utils/regularExp";
import {baseTheme} from "../styles/theme";



const Admin = () => {
    const {types, categories, sizes, admins} = useContext(Context)

    const titleAdmin = "Администратор";
    const titleProduct = "Продукт";
    const titleType = "Тип";
    const titleSize = "Размер";
    const titleCategory = "Категория";

    //для установки полной ширины модального окна у ProductDelete
    const widthModal = "none";

    const width768 = useContext(ContextWidth768)
    const isWidth768: boolean | undefined = width768?.isWidth


    return (
        <Section>
            <Title font_size={30}>Панель АДМИНИСТРАТОРА</Title>

            {!isWidth768 && <AdminAllSelect/>}

            <ControllerModal title={titleAdmin}>
                <BlockAdd store={admins} placeholder={"email"}
                          label={titleAdmin} regExp={regEmail}/>
                <BlockDelete label={titleAdmin} store={admins}/>
            </ControllerModal>

            {!isWidth768 && <ControllerModal title={titleType} >
                <BlockAdd store={types}
                          label={titleType} regExp={regTypes}/>
                <BlockDelete label={titleType} store={types}/>
            </ControllerModal>}


            {!isWidth768 && <ControllerModal title={titleCategory}>
                <BlockAdd  store={categories}
                          label={titleCategory} regExp={regCategory}/>
                <BlockDelete label={titleCategory} store={categories}/>
            </ControllerModal>}


            {!isWidth768 && <ControllerModal title={titleSize}>
                <BlockAdd  store={sizes}
                          label={titleSize} typeInput={"number"}/>
                <BlockDelete  label={titleSize} store={sizes}/>
            </ControllerModal>}


            {!isWidth768 && <ControllerModal title={titleProduct}>
                <ProductAdd/>
                <ProductDelete width={widthModal}/>
            </ControllerModal>}


        </Section>
    );
};

export default Admin;


const Section = styled.section`
    padding: 20px 0;
    display: grid;
    row-gap: 2px;   
    justify-content: center;
    text-align: center; 
  
  
  
    @media (${baseTheme.maxMedia.laptop1024}) {
        row-gap: 20px;       
        
    }
  
    & > p {
      margin-bottom: 1em;
    }
    
    

`

