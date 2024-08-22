import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../contexts";
import MyTitleForm from "./ui/MyTitleForm";
import MyFormButton from "./ui/MyFormButton";
import MyTable from "./ui/MyTable";
import SortingService from "./SortingService";
import {observer} from "mobx-react-lite";

export  interface IAdminAdmin{
    width?: string
}


const ProductDelete: FC<IAdminAdmin> = observer( () => {

    const [title, setTitle] = useState("Список  товаров")

    const stores = useContext(Context);
    const StoreProduct = stores.products;


    const listLabelTh = [
        "Название","Тип","Категория","Цена","Размеры"
    ]

    useEffect(() => {
        if (StoreProduct.getList().length === 0) {
            StoreProduct.listProduct()
                .then(response => setTitle(response.message))
        }
    }, [StoreProduct])

    const list = StoreProduct.getList()

    async function submit(e: any){
        console.log("submit")
        e.preventDefault()
        let formData = new FormData(e.target)
        if(!formData.has("id")) return

        let response = await StoreProduct.deleteProduct(formData)
        if(response.message.length > 0){
            setTitle(response.message)
            setTimeout(()=> {
                setTitle("Список  товаров")
            }, 3000)
        }

    }


    return (
        <form  onSubmit={submit}>
            <MyTitleForm content={title} store={StoreProduct}/>
            <SortingService thLabel={listLabelTh} store={StoreProduct}/>
            <MyTable list={list} thLabel={listLabelTh}/>
            <MyFormButton>Удалить</MyFormButton>
        </form>
    );
});

export default ProductDelete;
