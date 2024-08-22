import React, {FC, useContext} from 'react';
import {IProduct} from "../store/productStore";
import {Link} from "react-router-dom";
import {BASE_URL, PRODUCT_ONE_ROUTE} from "../utils/consts";
import styled from "styled-components";
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import sale from "../foto/sale.jpg";


interface IProductCard {
    product: IProduct
    state: boolean

}

const ProductCard: FC<IProductCard> = (
    {product, state: isTile}) => {
    const {
        id, name, type, category, price, sizes,
        img, id_category, id_type, paths
    } = product;

    let burgerStore = useContext(Context).burger
    let openBurger: boolean = burgerStore.isActiveBurger()

    // главной делаем первую фотографию
    let srcImgMain: string = paths.length > 0
        ? BASE_URL + paths[0].pathNameUrl
        : sale //если не фото в базе, показываем sale foto

    return (
        <CardBody $isTile={isTile}>
            <ImgBlock className={openBurger ? "lock" : ""}>
                <img src={srcImgMain} alt={"foto"}/>
                {/*добавляем для открытия в новой вкладке target={"_blank"}*/}
                {isTile && <Link to={PRODUCT_ONE_ROUTE + `/${product.id}`} />}
            </ImgBlock>
            <Content>
                <p>Название: {name}</p>
                <p>Тип: {type}</p>
                <p>Категория: {category}</p>
                <p>Стоимость: {price}</p>
                <p>Доступные размеры: {JSON.stringify(sizes)}</p>
            </Content>
            {/*добавляем для открытия в новой вкладке target={"_blank"}*/}
            {!isTile && <Link to={PRODUCT_ONE_ROUTE + `/${product.id}`}/>}
        </CardBody>
    );
};

export default observer(ProductCard);

const Content = styled.div`

`

const ImgBlock = styled.p`
    background-color: rgb(194, 183, 163);
    position: relative;

    & > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    &:after {
        content: "";
        display: block;
        width: 100%;
        padding-top: 100%;
    }

    & > a {
        width: 100%;
    }

    &.lock > a {
        width: 0;
    }
`


const CardBody = styled.div<{ $isTile: boolean }>`
    display: grid;
    gap: 5px;
    grid-template-columns: ${({$isTile}) => $isTile ? "1fr" : "0.2fr 0.8fr"};
    position: relative;

    a {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    & > a {
        width: 70%;
    }

`