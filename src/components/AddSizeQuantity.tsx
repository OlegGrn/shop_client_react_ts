import React, {FC, useState} from 'react';
import styled from "styled-components";
import {IProductId, ISizesQuantity} from "../store/productStore";
import {baseTheme} from "../styles/theme";
import AddingBasket from "./AddingBasket";

interface IAddSizeQuantity {
    oneProduct: IProductId
    id_user: number | undefined
}

const AddSizeQuantity: FC<IAddSizeQuantity> = (
    {oneProduct, id_user}) => {

    console.log("render AddSizeQuantity")

    const [chosenSize, setChosenSizes] =
        useState<ISizesQuantity>(oneProduct?.sizes[0])

    const chooseSizes = (size: ISizesQuantity) => {
        return function () {
            //if (size.sizeID === chosenSize.sizeID) return
            setChosenSizes(size)
        }
    }

    return (
        <Sizes>
            <p>Размер - {chosenSize.sizeName}</p>
            <ul>
                {oneProduct.sizes.map(size => <li key={size.sizeID}>
                    <SizeBtn
                        className={size.sizeName === chosenSize.sizeName ? "active" : ""}
                        onClick={chooseSizes(size)}
                    >
                        {size.sizeName}
                    </SizeBtn>
                </li>)}
            </ul>
            <Controller>
                {/*key={chosenSize.sizeID} чтобы сбросить состояние quantity
                внутри компонента при рендере */}
                <AddingBasket
                    key={chosenSize.sizeID}
                    chosenSize={chosenSize}
                    id_user={id_user}
                />
            </Controller>
        </Sizes>

    );
};

export default AddSizeQuantity;

const Controller = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  font-size: 16px;
  gap: 1em;


  @media (${baseTheme.maxMedia.laptop1024}) {
    flex-direction: column;
    & > div {
      align-self: center;
    }
  }

`

const Sizes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;

  ul {
    display: flex;
    gap: 0.8em;
  }
`

const SizeBtn = styled.button`
  font-size: 1.2em;
  padding: 10px;

  &.active {
    background-color: gold;
  }
`



