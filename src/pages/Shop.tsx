import React, {useContext, useState} from 'react';
import {Context, ContextWidth768} from "../contexts";
import AsideBar from "../components/AsideBar";
import SelectBar from "../components/SelectBar";
import {enumSelect, ISelected} from "../store/productStore";
import styled from "styled-components";
import LotProductPage from "./LotProductPage";
import {observer} from "mobx-react-lite";


const Shop = observer(() => {
    console.log("render Shop")

    const [notGoods, setNotGoods] = useState(false)
    const stores = useContext(Context)

    const width768 = useContext(ContextWidth768)
    const isWidth768: boolean | undefined = width768?.isWidth

    let selectedFromStore: ISelected = stores.products.getSelectProduct()

    //первичная загрузка товаров из БД
    if (selectedFromStore.type.length === 0 &&
        selectedFromStore.category.length === 0 &&
        selectedFromStore.size.length === 0) {
        if (stores.products.getStoreProducts().length === 0) {
            //первая загрузка page по дефолту === 1
            stores.products.allProduct().then(res => {
                if (res) setNotGoods(true)
            })
        }
    }


    if (notGoods) {
        return (
            <h2>Нет товаров</h2>
        )
    } else if (!isWidth768) {
        return (
            <GridBox>
                <ChildGrid_1>
                    <AsideBar/>
                </ChildGrid_1>
                <ChildGrid_2>
                    <SelectBar
                        store={stores.categories}
                        direction={"row"}
                        select={enumSelect.category}
                    />
                </ChildGrid_2>
                <ChildGrid_3>
                    <LotProductPage/>
                </ChildGrid_3>
            </GridBox>
        );
    } else {
        return (
            <LotProductPage isWidth768={isWidth768}/>
        )
    }
});


export default Shop;

const GridBox = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  //grid-template-rows: 0.1fr 1fr;
  grid-template-rows: max-content;


  gap: 20px;

  grid-template-areas: 
    "aside select" 
    "aside pages";
`;

const ChildGrid_1 = styled.div`
  background-color: aliceblue;
  grid-area: aside;



`;
const ChildGrid_2 = styled.div`
  background-color: aliceblue;
  grid-area: select;

`;
const ChildGrid_3 = styled.div`
  background-color: aliceblue;
  grid-area: pages;

`;

