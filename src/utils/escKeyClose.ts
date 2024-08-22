// использование:
// const [isModal, setIsModal] = useState(false);
// и так НЕ ДЕЛАТЬ setModal(е => !e), ВЕРНО = setModal(false)
//if (isModal) escKey(setIsModal);// закрытие клавишей esc окно
// функция возвращает слушателя клавиатуры, с опцией одного нажатия.
// Если нажатие не Esc, функция рекурсивно возвращает себя, пока не будет нажата Esc


import React from "react";

export function escKeyClose(setModal: (b: boolean) => void): any {
    function keyListener(e: KeyboardEvent, setModal: (b: boolean) => void) {
        if (e.key === "Escape") {
            setModal(false)
        } else {
            return escKeyClose(setModal)
        }
    }

    return (
        document.addEventListener(
            "keydown",
            (e) => keyListener(e, setModal),
            {once: true}
        )
    )
}

export function clickClose
(
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
): any {

    function clickListener(
        e: any,
        setModal: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        const el: HTMLElement = e.target;
        if (!el.closest(`#${id}`)) {

            setModal(false)
        } else {
            return clickClose(setModal, id)
        }
    }

    setTimeout(() => {
        return (
            document.addEventListener(
                "click",
                (e) => {
                    clickListener(e, setModal)
                },
                {once: true}
            )
        )
    }, 0)
}

