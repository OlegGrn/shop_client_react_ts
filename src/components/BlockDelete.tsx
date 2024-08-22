import React, {FC, useEffect, useState} from 'react';
import BaseStore from "../store/common_class/BaseStore";
import MyTitleForm from "./ui/MyTitleForm";
import MyTable from "./ui/MyTable";
import MyFormButton from "./ui/MyFormButton";
import {observer} from "mobx-react-lite";
import SortingService from "./SortingService";

interface IBlockDelete {
    label: string,
    store: BaseStore
    heightScroll?: number

}

const BlockDelete: FC<IBlockDelete> = observer((
    {
       label, heightScroll, store
    }) => {

    const [title, setTitle] = useState(label);

    function madeList(store: BaseStore) {
        let {message} = store.madeList();
        if (message.length > 0) {
            setTitle(message)
        }
    }

    useEffect(() => {
        if (store.getData().length === 0) {
            store.getAllData().then(() => {
                madeList(store)
            })
        } else madeList(store)
    }, [store.getData()])


    const list = store.getList();


    async function submit(e: any) {
        e.preventDefault();
        let formData = new FormData(e.target);
        if (!formData.has("id")) return;
        let response = await store.deleteData(formData)
        setTitle(response.message)
        if (response.status === 200) {
            setTimeout(() => {
                setTitle(title)
            }, 3000)
        }
    }


    return (
        <form onSubmit={submit}>
            <MyTitleForm content={`Список: ${title}`} store={store}/>
            <SortingService thLabel={[label]} store={store}/>
            <MyTable
                heightScroll={heightScroll}
                list={list}
                thLabel={[label]}/>
            <MyFormButton  >Удалить</MyFormButton>
        </form>
    );
});

export default BlockDelete;