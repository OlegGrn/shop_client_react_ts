import React, {FC, useContext, useState} from 'react';
import {Context} from "../contexts";
import {enumSelect, IProduct} from "../store/productStore";
import {observer} from "mobx-react-lite";
import { QUANTITY_GOODS_LIMIT} from "../utils/consts";
import QuantityPages from "../components/QuantityPages";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import MyTileIcon from "../components/ui/MyTileIcon";
import MyListIcon from "../components/ui/MyListIcon";
import CoverButton from "../components/ui/CoverButton";
import Loading from "../components/Loading";
import {useRevBetweenRender} from "../my_hooks/useRevBetweenRender";
import LimitCustomSelect from "../components/LimitCustomSelect";

interface ILotProductPage {
    isWidth768?: boolean
}


const LotProductPage: FC<ILotProductPage> = observer(({isWidth768}) => {

    console.log("render localstorage")



    // переключатель вывода: плитка или список
    let test = localStorage.getItem("view") !== "false";

    const [isTile, setIsTile] = useState<boolean>(isWidth768? true : test)

    // функция сохранения выбранного состояния (плитка или список)
    // между рендерами элемента с использованием useRef и useEffect
    useRevBetweenRender(isTile)

    // индикатор загрузки данных
    const [loadingShowYet, setLoadingShowYet] = useState(false)

    const productsStore = useContext(Context).products;
    const selectProductInStore = productsStore.getSelectProduct();
    const currentPage = selectProductInStore.currentPage;
    const quantityPages: number = productsStore.getQuantityPages()

    console.log("quantityPages = " + quantityPages)

    const arrPages: number[] = Array(quantityPages).fill(0).map((_, i) => ++i);

    const allProducts: IProduct[] = productsStore.getStoreProducts();

    function showYet(currentPage: number) {
        return async function () {
            //для исключения отправки запроса пока уже есть активный запрос.
            if (productsStore.isLoading()) return
            setLoadingShowYet(true)
            await productsStore.showYetProduct(currentPage)
            setLoadingShowYet(false)
        }
    }

    async function changePage(currentPage: number, page: number = 0,) {
        console.log("currentPage = " + currentPage + ", page = " + page)
        if (currentPage === page) return
        //для исключения отправки запроса пока уже есть активный запрос.
        if (productsStore.isLoading()) return

        //???? устанавливаем новое значение currentPage (новое = page) в productsStore в this._selectProduct
        //????  productsStore.setLimitOrPage(enumSelect.currentPage, page)

        // обновляем allProducts
        await productsStore.allProduct(page)
    }

    async function changeLimitShowPages(val: string) {
        //для исключения отправки запроса пока уже есть активный запрос.
        if (productsStore.isLoading()) return
        // для перестраховки
        if(isNaN(+val)) return

        const newLimit: number = Number(val);
        //лимит из стора
        const storeLimit = productsStore.getSelectProduct().limit
        if(newLimit !== storeLimit) {
            //сохраняем в сторе новый лимит
            productsStore.setLimitOrPage(enumSelect.limit, newLimit);
            //загружаем новый лист с новым лимитом и первой страницей
            await productsStore.allProduct(1)
        }
    }

    let defValueLimit = selectProductInStore.limit.toString()

    return (
        <BodyContent $width={isWidth768 ?? false}>
            {!isWidth768 &&
                <Top>
                    <LimitCustomSelect
                        list={QUANTITY_GOODS_LIMIT}
                        funcChangeSelected={changeLimitShowPages}
                        defValueLimit={defValueLimit}
                    />
                    <View>
                        <MyTileIcon columns={3} width={"40px"} dispatch={setIsTile} state={isTile}/>
                        <MyListIcon lines={4} width={"50px"} height={"40px"} dispatch={setIsTile} state={isTile}/>
                    </View>
                </Top>
            }
            <div>
                <Content $isTile={isTile} className={isWidth768?"tablet": ""}>
                    {allProducts.map(product => <li key={product.id}>
                        <ProductCard product={product} state={isTile}/>
                    </li>)}
                </Content>
            </div>

            <HiddenCover $hidden={currentPage < quantityPages}>
                <CoverButton funcClick={showYet(currentPage)}
                >{loadingShowYet
                    ? <Loading/>
                    : "Показать ещё"}
                </CoverButton>
            </HiddenCover>
            {!isWidth768 && <QuantityPages
                currentPage={currentPage}
                changePage={changePage}
                listPages={arrPages}/>}
        </BodyContent>
    );
});

export default LotProductPage;

const HiddenCover = styled.div<{ $hidden: boolean }>`
    display: ${({$hidden}) => $hidden
            ? "block"
            : "none"};`

const BodyContent = styled.div<{ $width: boolean }>`
    height: 100%;
    display: grid;
    grid-template-rows: ${({$width}) => $width
            ? "1fr max-content"
            : "max-content 1fr"};
    grid-auto-flow: row;
    gap: 20px;
    padding-bottom: 20px;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

const View = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

const Content = styled.ul<{ $isTile: boolean }>`
    display: grid;
    grid-template-columns: ${({$isTile}) => $isTile
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : "1fr"};
    gap: 20px;
    grid-template-rows: max-content;
    
    &.tablet{
      padding-top:10px;
    }
`
