import React, {SetStateAction, useContext} from "react";
import {Context, ContextControllersModal} from "../contexts";


export const useAddBasket = (
    id_user: number | undefined,
    id_device: number, id_size: number,
    quantity: number,
    setQuantity: React.Dispatch<SetStateAction<number>>,
    adding: boolean,
    setAdding: React.Dispatch<SetStateAction<boolean>>
) => {

    //для открытия модалки с авторизацией, если юзер не авторизован и
    //хочет добавить товар в корзину
    const {setOpenLogin} = useContext(ContextControllersModal)

    const basketsStore = useContext(Context).baskets

    return function () {
        if (id_user !== undefined && adding) {
            setAdding(false);
            basketsStore
                .addData({
                    id_user, id_device, id_size, quantity_chosen: quantity
                })
                .finally(() => {
                    setQuantity(1);
                    basketsStore
                        .getDataUser(id_user)
                        .finally(() => setAdding(true))
                })
        } else if (id_user === undefined) {
            //если юзер не авторизован и хочет добавить товар в корзину
            setOpenLogin(true)
        } else {
            console.log("quantity = " + quantity + ", id_user = " + id_user)
            return
        }
    }
}