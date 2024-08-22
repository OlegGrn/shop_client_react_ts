import React, {useContext} from 'react';
import {Context} from "../contexts";
import styled from "styled-components";
import {baseTheme} from "../styles/theme";
import Loading from "./Loading";
import {observer} from "mobx-react-lite";




const LoginOut = observer(() => {

    const store = useContext(Context)
    const loading = store.user.isLoading()

    const logOut = async () => {
        await store.user.logOut()
    }

    return (
        <Form>
            <Email>
                {loading
                    ? <Cover>
                        <Loading/>
                    </Cover>
                    : <>
                        <span>email: </span>
                        <span>{store.user.getUser()?.email}</span>
                    </>
                }
            </Email>
            <Button onClick={logOut}>Выход</Button>
        </Form>
    );
});

export default LoginOut;


////////////////// STYLE ////////////////////////////////////////////////////////////
const Form = styled.form`
    color: ${baseTheme.colors.formLogOut.font};
    font-size: 20px;
    padding: 20px 10px;
    width: 100%;
    background-color: transparent;

    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Email = styled.div`
    min-height: 30px;
    display: flex;
    gap: 7px;
    align-items: center;

    span {
        &:last-child {
            font-size: 25px;
        }
    }
`
const Button = styled.button`
    font-size: 20px;
    color: ${baseTheme.colors.formLogOut.button.font};
    background-color: ${baseTheme.colors.formLogOut.button.bg};
    padding: 10px;
    border-radius: 5px;
`
const Cover = styled.div`
    text-align: center;
    width: 100%;
`


