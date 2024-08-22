import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../contexts";
import Loading from "../components/Loading";
import SwiperBlock from "../components/SwiperBlock";
import styled from "styled-components";
import {IProductId} from "../store/productStore";
import AddSizeQuantity from "../components/AddSizeQuantity";
import {baseTheme} from "../styles/theme";


const OneProductPage = () => {

    console.log("render OneProductPage");
    const stores = useContext(Context)
    const productStore = stores.products
    const id_user: number | undefined =  stores.user.getUser()?.id
    const params = useParams();
    const id = params.id;


    const [isLoading, setIsLoading] = useState(true);
    const [oneProduct, setOneProduct] = useState<IProductId>();
    const [errMessage, setErrMessage] = useState<string>();

    useEffect(() => {
        if (id) {
            productStore.oneProduct(id)
                .then(product => {
                    if (typeof product !== "string") {
                        setOneProduct(product)
                    } else {
                       setErrMessage(product)
                    }
                })
                .finally(() => setIsLoading(false))

        }
    }, [])

    return (
        <Body>
            {
                isLoading
                    ? <Loading/>
                    : errMessage
                        ? <h2>{errMessage}</h2>
                        : <>
                            {
                                oneProduct &&
                                <>
                                    <Slider>
                                        <SwiperBlock fotoSlider={oneProduct.paths} minLimitFoto={8}/>
                                    </Slider>
                                    <Content>
                                        <Price>
                                            {oneProduct.price} руб./шт
                                        </Price>
                                        <Quantity>
                                            {oneProduct.sizes[0].quantity === 1
                                                ? "Последний экземпляр"
                                                : "Достаточное количество"
                                            }
                                        </Quantity>
                                        <AddSizeQuantity
                                            id_user={id_user}
                                            oneProduct={oneProduct}
                                        />
                                        <LabelTop>Характеристики:</LabelTop>
                                        <Rubric>
                                            <Description>Пол: </Description>
                                            <Label>{oneProduct.type}</Label>
                                        </Rubric>
                                        <Rubric>
                                            <Description>Категория:</Description>
                                            <Label>{oneProduct.category}</Label>
                                        </Rubric>
                                        <Rubric>
                                            <Description>Описание:</Description>
                                            <Label>{oneProduct.description}</Label>
                                        </Rubric>
                                    </Content>
                                </>
                            }
                        </>
            }
        </Body>
    );
};

export default OneProductPage;

const Quantity = styled.div`
  color: green;
  font-weight: 500;
`
const Label = styled.p`

`
const LabelTop = styled.p`
  font-weight: 700;
`
const Rubric = styled.div`
  display: flex;
  align-items: center;
`
const Description = styled.p`
  font-weight: 700;
  margin-right: 10px;
`

const Price = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`

const Body = styled.div`
    
  //min-height: 50vh;
  
  min-width: 300px;
  display: grid;
  grid-template-columns: minmax(0, 60%) minmax(0, 40%);
  padding-bottom: 20px;
  gap: 15px;
    
   


  @media (${baseTheme.maxMedia.tablet768}) {
    grid-template-columns: minmax(0, 100%);
    grid-auto-flow: row;
  }

`

const Slider = styled.div`

    height: 60vh;
  //height: auto;

  @media (${baseTheme.maxMedia.tablet768}) {
    margin-right: -10px;
    margin-left: -10px;
  }

`
const Content = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

`