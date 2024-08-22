import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import GlobalStyle from "./styles/global";
import {ThemeProvider} from 'styled-components';
import {baseTheme} from "./styles/theme";
import Wrapper from "./components/Wrapper";
import {Context, ContextWidth768} from "./contexts";
import {useMediaQuery} from "./my_hooks/useMediaQuery";





function App() {

    const store = useContext(Context)
    let isWidth768: boolean = useMediaQuery('(max-width: 768px)');

    //пока не загрузится данные по авторизации, Wrapper не грузим (см. ниже  - flag)
    //этим избегаем повторных рендеров и мерцаний экрана
    const[flag, setFlag] = useState(false)
    useEffect(() => {
        store.user.authStart().finally(() => setFlag(true))
    }, [])

    return (
        <ContextWidth768.Provider value={{isWidth: isWidth768}}>
            <ThemeProvider theme={baseTheme}>
                <BrowserRouter>
                    <GlobalStyle/>
                    <Wrapper flag={flag}/>
                </BrowserRouter>
            </ThemeProvider>
        </ContextWidth768.Provider>

    );
}

export default App;
