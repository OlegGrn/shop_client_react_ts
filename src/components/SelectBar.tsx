import React, {FC, useContext} from 'react';
import styled from "styled-components";
import BaseUniqueStore from "../store/common_class/BaseUniqueStore";
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import {baseTheme} from "../styles/theme";
import ProductStore, {enumSelect, ISelected} from "../store/productStore";


interface IButtonsColumn {
    store: BaseUniqueStore;
    direction: "row" | "column";
    select: enumSelect.type | enumSelect.category

}

const SelectBar: FC<IButtonsColumn> = observer((
    {store, direction, select}) => {

    const products = useContext(Context).products;


    let selectedFromStore: ISelected = products.getSelectProduct()
    //подгружаем данные с сервера, если store пустой
    if(store.getUniqueData().length === 0) {
        store.getUnique().then(r => r)
    }
    const list = store.getUniqueData(); // получаем из магазина
    function addSelect(select: enumSelect.type | enumSelect.category,
                       id: number, storeProducts: ProductStore) {

        return function () {
            let selected = storeProducts.getSelectProduct();
            let index = selected[select].indexOf(id)
            storeProducts.setSelectProduct(select, id, index);
        }
    }


    return (
        <Ul className={direction}>
            {list.map(item => <li key={item.id}>
                <Button
                    className={selectedFromStore[select].includes(item.id)?"active": " "}
                    $active={selectedFromStore[select].includes(item.id)}
                    onClick={addSelect(select, item.id, products)}
                    type={"submit"}
                    value={item.id}
                    name={select}
                >
                    {item.name}
                </Button>
            </li>)}
        </Ul>


    );
});

export default SelectBar;

const Button = styled.button<{ $active: boolean }>`
  background-color: ${({$active}) => $active
          ? baseTheme.colors.selectBar.button.bg_active
          : baseTheme.colors.selectBar.button.bg};
  color: ${({$active}) => $active
          ? baseTheme.colors.selectBar.button.text_active
          : baseTheme.colors.selectBar.button.text};
`

const Ul = styled.ul`
    width: 100%;
    height: 100%;
    padding-top: 10px;

    li {
      
     
        button {           
            width: 100%;
            height: 100%;
            font-size: 20px;
            transition: all 0.2s ease-in 0s;

            &:hover:not(.active) {
                color: ${baseTheme.colors.selectBar.button.color_hover};
            }

            &:hover.active {
                color: ${baseTheme.colors.selectBar.button.color_hover_active};

            }


        }
    }

    &.row {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: start;
        /*display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8em, 12em));*/
        
        flex-wrap: wrap;

        & li {
          max-width: 15em;
          min-width: 10em;
          flex-shrink: 1;
          flex-grow: 1;
            button {
                padding: 10px 20px;
                border: 1px solid #e8e7e7;

            }
        }

    }

    &.column {
        display: flex;        
        flex-direction: column;

        & li {
            button { 
                padding: 1em;
                border-bottom: 1px solid #d2d2d2;
                text-align: start;

                &:hover {
                    border-bottom: 1px solid ${baseTheme.colors.selectBar.button.text_active};
                }
                &.active {
                    border-bottom: 1px solid ${baseTheme.colors.selectBar.button.text_active};
                }
            }
        }

        & li:not(:last-child) {
            button {
                
            }
        }
    }
`;





