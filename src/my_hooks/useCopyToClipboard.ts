import {useCallback, useState} from "react";

export default function useCopyToClipboard(value: string): [boolean, (ms: number) => Promise<void>]{

    const [isCopied, setIsCopied] = useState(false)

    const coping = useCallback(async (ms: number): Promise<void> => {
        try {
            await navigator.clipboard.writeText(value)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, ms)

        } catch (e: any){
            console.log(e)
        }

    }, [value])

    return [isCopied, coping]

}