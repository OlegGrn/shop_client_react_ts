import {useLocation} from "react-router-dom";
import React from "react";


//для предотвращения клика на иконку, если мы уже на этой странице
//чтобы не было повторного рендера
//и для закрытия мини модалки, когда перешли на страницу с корзиной
export const usePrevSameClick = (dispatch: React.Dispatch<React.SetStateAction<boolean>>,
                                 pattern: string) => {

    const location = useLocation()
    const currentPath: string = location.pathname.replace(/\W/g, "")
    const newPattern = pattern.replace(/\W/g, "")

    let test: number = currentPath.localeCompare(newPattern)

    //для закрытия мини модалки, когда перешли на страницу с корзиной
    if(test === 0) {
        //через setTimeout поскольку более одного компонента пытаются отрендериться одновременно
        // из-за одной функции и выкидывается ошибка
        setTimeout(() => dispatch(false), 0)
    }


    //для предотвращения клика на иконку, если мы уже на этой странице
    return function (){
        if(test === 0 ) {
            return
        } else {
            dispatch(e => !e)
        }
    }
}