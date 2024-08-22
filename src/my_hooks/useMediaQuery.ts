import {useEffect, useState} from 'react';


export const useMediaQuery = (media: string): boolean  => {

    const width: number = +media.replace(/\D/g, "")

   const [isWidth, setIsWidth] = useState<boolean>(
       window.innerWidth < width);


    useEffect(() => {
        const mediaQuery = window.matchMedia(media);
        const handleResize = (e: MediaQueryList) => {
            if (e.matches) {
                console.log('Media Query = ', e.matches);
                setIsWidth(e.matches)
            } else {
               console.log('Media Query = ', e.matches);
                setIsWidth(e.matches)
            }
        }

        mediaQuery.addEventListener("change", () => handleResize(mediaQuery))
        handleResize(mediaQuery)

        return () => {
            console.log("removeEventListener")
            mediaQuery.removeEventListener("change", () => handleResize(mediaQuery))
        }

    }, []);



    return  isWidth
}