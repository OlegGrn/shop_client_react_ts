import React, {useContext} from 'react';
import styled from "styled-components";
import Container from "./Container";
import {Context} from "../contexts";
import {Route, Routes} from "react-router-dom";
import {adminRouter, authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";



const Main = observer( () => {
    console.log("render Main")

    const storeUser = useContext(Context).user
    const isAuth: boolean = storeUser.isAuth()
    const isAdmin: boolean = storeUser.isAdmin()



    return (
        <MainBlock>
            <Container>
                <Routes>
                    {isAuth && authRoutes.map( item => <Route
                        key={item.path}
                        path={item.path}
                        element={item.component}
                    />)}
                    {publicRoutes.map( item => <Route
                        key={item.path}
                        path={item.path}
                        element={item.component}
                    />)}
                    {isAdmin && adminRouter.map( item => <Route
                        key={item.path}
                        path={item.path}
                        element={item.component}
                    />)}
                </Routes>
            </Container>
        </MainBlock>
    );
});

export default Main;

const MainBlock = styled.main`
  background-color: white;
`;




















