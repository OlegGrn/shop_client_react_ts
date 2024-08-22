import React, {FC, useContext, useState} from 'react';
import Title from "./ui/Label";
import styled from "styled-components";
import BaseUniqueStore from "../store/common_class/BaseUniqueStore";
import {observer} from "mobx-react-lite";
import {Context} from "../contexts";
import CoverButton from "./ui/CoverButton";
import {enumSelect} from "../store/productStore";
import CheckBoxSize from "./CheckBoxSize";
import Loading from "./Loading";
import { useLocation, useNavigate } from 'react-router-dom';
import {baseTheme} from "../styles/theme";


interface IAsideForm {
    title: string
    store: BaseUniqueStore

}

const AsideForm: FC<IAsideForm> = observer((
    {title, store}) => {

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname)

    // для крутилки пока идет загрузка данных
    const [loadingShow, setLoadingShow] = useState(false)
    // для крутилки пока идет удаление фильтров и загрузки данных
    const [isLoadingDelFilter, setIsLoadingDelFilter] = useState(false)

    const [clearChecked, setClearChecked] = useState(false);

    const stores = useContext(Context)
    const productsStore = stores.products;
    //для кнопки снятия фильтров - для очистки checkBox


    if (store.getUniqueData().length === 0) {
        store.getUnique().then(r => r)
    }

    let list = store.getUniqueData()

    function closeBurger(){
        const burgerStore = stores.burger;
        let isActiveBurger: boolean = burgerStore.isActiveBurger();
        if(isActiveBurger) {
            burgerStore.click()
            if(location.pathname !== "/shop/*"){
                navigate("shop/*")
            }
        } else return
    }

    async function submit(e: any) {
        e.preventDefault();
        //для исключения отправки запроса пока уже есть активный запрос.
        if(productsStore.isLoading()) return
        //опции выбора (selected) передаются вызываемой функции в самом сторе
        setLoadingShow(true)
        await productsStore.allProduct(1)
        setLoadingShow(false)
        //для закрытия бургера на мобильной версии и при необходимости переход на страницу магазина
        //(это когда была открыта страница не магазина location.pathname !== "/shop/*", а мы
        // нажали "показать выбранное", тогда => navigate("shop/*")
        closeBurger()

    }

    async function defOption(e: any) {
        e.preventDefault();
        //для исключения отправки запроса пока уже есть активный запрос.
        if(productsStore.isLoading()) return
        let {size, category, type} = productsStore.getSelectProduct()
        if(size.length !== 0 || type.length !== 0 || category.length !== 0) {
            //устанавливаем дефолтные значения в сторе для SelectProduct
            productsStore.setDefaultSelectProduct();
            //получаем дефолтные значения из базы и
            // загружаем их в стор (будет рендер списка товаров)
            setIsLoadingDelFilter(true)
            await productsStore.allProduct(1);
            setIsLoadingDelFilter(false)
            //для кнопки снятия фильтров - для очистки checkBox
            setClearChecked(true)
            //для закрытия бургера на мобильной версии и т.д. (см.выше)
            closeBurger()

        }
    }





    return (
        <FormInput onSubmit={e => submit(e)}>
            <Title>
                {title}
            </Title>
            <Ul>
                {list.map(item => <li key={item.id}>
                    <CheckBoxSize
                        dispatch={setClearChecked}
                        state={clearChecked}
                        select={enumSelect.size}
                        name={"size"}
                        value={item.id}
                        label={item.name}/>
                </li>)}
            </Ul>
            <CoverButton>{loadingShow
                ?<Loading/>
                :"Показать выбранные"}
            </CoverButton>
            <CoverButton funcClick={defOption}>{isLoadingDelFilter
                ?<Loading/>
                :"Снять все фильтры"}
                </CoverButton>


        </FormInput>
    );
});


export default AsideForm;

const FormInput = styled.form`
    padding: 10px 0;
    display: grid;
    gap: 15px;
    @media (${baseTheme.maxMedia.tablet768}) {
        
       p {
           padding-left: 1em;
           font-size: 20px;
       }
    }

`;
const Ul = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    row-gap: 3px;

    @media (${baseTheme.maxMedia.tablet768}) {
        padding-left: 1em;
        row-gap: 1em;
       

    }
`;
