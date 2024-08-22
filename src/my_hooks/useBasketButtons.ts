import {useState} from "react";
import BasketStore from "../store/basketStore";

export default function useBasketButtons(baskets: BasketStore){

    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    function clickDel(id_row: number, id_user: number) {
        setIsDeleting(true)
        baskets.deleteData({id: id_row})
            .finally(() => {
                baskets
                    .getDataUser(id_user)
                    .finally(() => setIsDeleting(false))
            })
    }

    function clickUpdate(qty: number, id_order: number) {
        setIsUpdating(true)
        baskets
            .updateOrder(qty, id_order)
            .finally(() => setIsUpdating(false))
    }


    return {
        isUpdating, isDeleting, clickUpdate, clickDel
    }
}