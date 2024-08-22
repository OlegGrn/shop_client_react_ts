import React, {FC, useEffect, useState} from 'react';
import {TypeStore} from "../../store/typeStore";
import {CategoryStore} from "../../store/categoryStore";
import {SizeStore} from "../../store/sizeStore";
import Loading from "../Loading";
import styled from "styled-components";
import Title from "./Label";
import {madeListAdmin} from "./my_select/mySeletcUtils";
import MySelectApp from "./my_select/MySelectApp";

interface IAdminCustomSelect {
    store: TypeStore | CategoryStore | SizeStore,
    title: string,
}


const AdminCustomSelect: FC<IAdminCustomSelect> = (
    {store, title}
) => {
    // первая загрузка (store пустой) = > store.getAllData()
    // - проверка на длину store.getData()
    // - длина будет 0 = > store.getAllData()
    // при переходах: подтягиваем уже из store
    // - проверка на длину store.getData()
    // - длина НЕ будет 0 = > store.getData()

    const [isLoadingData, setIsLoadingData] = useState(true)
    let list = store.getData()

    useEffect(() => {
        if (list.length === 0) {
            setIsLoadingData(false)
            store.getAllData()
                .then(() => {
                    setIsLoadingData(true)
                })
        }
    }, [store])

    let newList = !isLoadingData
        ? []
        : madeListAdmin(list)


    return (
        <AdminSelect>
            <Title font_size={20}>{title}</Title>
            {!isLoadingData
                ? <Loading/>
                : <MySelectApp list={newList}/>
            }
        </AdminSelect>
    );
};


export default AdminCustomSelect;

const AdminSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
`