import {useEffect, useRef} from "react";

export function useRevBetweenRender(state: boolean){

    const valueRef = useRef(state);

    useEffect(()=> {
        //при каждом изменении state перезаписываем valueRef.current
        valueRef.current = state
    }, [state])

    useEffect(()=> {

        return () => {
            // при демонтаже элемента последнее значение valueRef.current сохраняем
            // в виде строки в  localStorage
            const saveValue: string = valueRef.current.toString()
            localStorage.setItem("view", saveValue )
        }
    }, [])
}