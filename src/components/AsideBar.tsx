import React, {useContext} from 'react';
import styled from "styled-components";
import AsideForm from "./AsideForm";
import {Context, ContextWidth768} from "../contexts";
import SelectBar from "./SelectBar";
import {enumSelect} from "../store/productStore";


const AsideBar = () => {
    console.log("render AsideBar")

    const stores = useContext(Context)
    const width768 = useContext(ContextWidth768)
    const isWidth768: boolean | undefined = width768?.isWidth

    return (
        <ArticleBar>

            <SelectBar
                store={stores.types}
                direction={"column"}
                select={enumSelect.type}
            />
            {isWidth768 && <WrapperSelect>
                <SelectBar
                    store={stores.categories}
                    direction={"column"}
                    select={enumSelect.category}
                />
            </WrapperSelect> }

                <AsideForm
                    title={"Размеры: "}
                    store={stores.sizes}
                />
        </ArticleBar>
    );
};

export default AsideBar;

const ArticleBar = styled.article`
    display: flex;
    flex-direction: column;
    gap: 25px;
    
`;
const WrapperSelect = styled.div`
    ul.column li button{
        padding-left: 2em;
    }
   
`


