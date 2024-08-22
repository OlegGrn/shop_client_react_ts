import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import MyTitleForm from "./ui/MyTitleForm";
import {Context} from "../contexts";
import ProductInput from "./ProductInput";
import ProductSelect from "./ProductSelect";
import ProductSelectInput from "./ProductSelectInput";
import {baseTheme} from "../styles/theme";
import SubmitProduct from "../utils/submitProduct";
import {
    DESCRIPTION,
    ID_CATEGORY,
    ID_SIZE,
    ID_TYPE,
    IMG,
    NAME,
    PRICE,
    QUANTITY,
    QUANTITY_FOTO_LOADING
} from "../utils/consts";
import {IAdminAdmin} from "./ProductDelete";
import AddingChildren from "./AddingChildren";

const ProductAdd: FC<IAdminAdmin> = () => {

    const stores = useContext(Context)
    const {products} = stores

    const [title, setTitle] = useState(
        "Добавить товар"
    )

    const [valid, setValid] = useState({
        validName: true, validDesc: true, validPrice: true, validSizes: true
    })


    const {types, categories, sizes} = useContext(Context)
    const dataType = types.getData()
    const dataCategory = categories.getData()
    const dataSizes = sizes.getData()

    async function submit(e: any) {
        e.preventDefault();
        let res = await SubmitProduct.submitAddProduct(e, products)
        setTitle(res.message)
        setValid({
            ...valid,
            validName: res.validName,
            validDesc: res.validDesc,
            validPrice: res.validPrice,
            validSizes: Boolean(res.validSizes)
        })
    }

    return (
        <FormBody onSubmit={submit}>
            <MyTitleForm font_size={40} content={title} store={products}/>
            <List>
                <li><ProductSelect data={dataType} name={ID_TYPE} label={"Тип"}/></li>
                <li><ProductSelect data={dataCategory} name={ID_CATEGORY} label={"Категория"}/></li>
                <li>
                    <AddingChildren>
                        <ProductSelectInput data={dataSizes} nameSelect={ID_SIZE} valid={valid.validSizes}
                                            nameInput={QUANTITY} typeInput={"number"}
                                            labelSelect={"Размер"} labelInput={"Количество"}/>
                    </AddingChildren>
                </li>
                <li><ProductInput label={"Название"} name={NAME}
                                  type={"text"} valid={valid.validName}/></li>
                <li><ProductInput label={"Описание"} name={DESCRIPTION}
                                  type={"text"} textArea={true} valid={valid.validDesc}/></li>
                <li><ProductInput label={"Стоимость"} name={PRICE}
                                  type={"number"} valid={valid.validPrice}/></li>
                <li>
                    <AddingChildren limit={QUANTITY_FOTO_LOADING}>
                        <ProductInput label={"Фотография"} name={IMG}
                                      type={"file"}/>
                    </AddingChildren>
                </li>
                <li><Button>Добавить товар</Button></li>
            </List>
        </FormBody>
    );
};

// name, price, description, id_category, id_type, [size], property

export default ProductAdd;

const FormBody = styled.form`
  max-height: 80vh;
  overflow-y: auto;

`

const Button = styled.button`
  font-size: 40px;
  width: 100%;
  text-align: center;
  color: ${baseTheme.colors.productSelectInput.button.text};
  padding: 10px 30px;
  border-radius: 5px;
  background-color: ${baseTheme.colors.productSelectInput.button.bg};
`

const List = styled.ul`
  font-size: 25px;
  font-weight: 500;
  padding-top: 35px;
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  row-gap: 30px;
  column-gap: 15px;

  input, textarea {
    font-size: inherit;
    padding: 5px;
  }

  span {
    color: white;
  }

  li {
    &:nth-child(1),
    &:nth-child(2) {
      div {
        display: flex;
        align-items: center;
        gap: 10px;

        select {
          flex-basis: max-content;
          min-width: 200px;
          font-size: 20px;
          padding: 5px;
        }
      }
    }

    &:nth-child(2) {
      div {
        justify-content: end;
      }
    }

    &:nth-child(3) {
      grid-column: span 2;
    }

    &:nth-child(4),
    &:nth-child(5) {
      grid-column: span 2;

      & > div {
        & > label {
          display: grid;
          row-gap: 10px;
        }
      }
    }

    &:nth-child(6) {
      grid-column: span 2;
    }

    &:nth-child(7) {
      grid-column: span 2;
      color: white;

      label {
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        row-gap: 10px;
      }
    }

    &:last-child {
      grid-column: span 2;

    }
  }



`
