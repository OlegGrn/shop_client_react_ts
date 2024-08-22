import React, {useEffect, useRef} from "react";


export const useCloseMiniModal = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {

    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let noFirstClick: boolean = false;
        const clickClose = (event: MouseEvent) => {
            const {target} = event
            if(target instanceof Node
                && !rootRef.current?.contains(target)
                && noFirstClick){
                setOpen(false)
            } else {
                noFirstClick = true
            }
        }
        const escapeClose = (event: KeyboardEvent) => {
            const {key} = event
            if(key === "Escape"){
                setOpen(false)
            }

        }

        document.addEventListener("click", clickClose);
        document.addEventListener("keydown", escapeClose)

        return () => {
            document.removeEventListener("keydown", escapeClose)
            document.removeEventListener("click", clickClose)
        }

    }, [])

    return rootRef
}