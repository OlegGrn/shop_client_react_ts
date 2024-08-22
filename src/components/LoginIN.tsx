import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import Login2SVG from "../svg/Login2SVG";
import PasswordSVG from "../svg/PasswordSVG";
import {baseTheme} from "../styles/theme";
import {Context} from "../contexts";
import {observer} from "mobx-react-lite";
import TitleForm from "./TitleForm";
import {request, setToken, validFormData} from "../utils/submitLogin";
import MyFormButton from "./ui/MyFormButton";


export interface IDataForm {
    email: string | boolean,
    password: string | boolean,
    repeat: boolean

}

interface ILoginIn{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginIN:FC<ILoginIn>  = ({setOpen}) => {

    const defDataForm: IDataForm = {email: true, password: true, repeat: true}
    const store = useContext(Context);
    const user = store.user

    const [authType, setAuthType] = useState(true)
    const [dataForm, setDataForm] = useState<IDataForm>(defDataForm)
    const [resMessage, setResMessage] = useState("")


    const submit = async (e: any) => {
        e.preventDefault()
        const form: HTMLFormElement = e.target
        const {email, password, repeat} = validFormData(form)
        setDataForm({...dataForm, email, repeat, password}); // не валидные поля подсвечиваем
        let response = await request(email, password, repeat, user, authType); //ответ с сервера
        setToken(response, form, setResMessage, setOpen) // устанавливаем токены, закрываем окно, очищаем форму
    }

    const changeButton = () => {
        setResMessage("")
        setAuthType(e => !e)
        setDataForm(defDataForm)
    };

    return (
        <Form onSubmit={submit}>
            <TitleForm resMessage={resMessage} authType={authType}/>
            <List>
                <RowInput>
                    <Icon><Login2SVG color={baseTheme.colors.formAuth.icon.icon}/></Icon>
                    <Input name="email" type="text" placeholder="Email"
                           $test={dataForm.email.toString()}/>

                </RowInput>
                <RowInput>
                    <Icon><PasswordSVG color={baseTheme.colors.formAuth.icon.icon}/></Icon>
                    <Input name="password" type="password" placeholder="Пароль"
                           $test={dataForm.password.toString()}/>

                </RowInput>
                {!authType &&
                    <RowInput>
                        <Icon><PasswordSVG color={baseTheme.colors.formAuth.icon.icon}/></Icon>
                        <Input name="repeat" type="password" placeholder="Повторите пароль"
                               $test={dataForm.repeat.toString()}/>

                    </RowInput>
                }
                <RowButton>
                    <MyFormButton>
                        {authType ? "Авторизоваться" : "Зарегистрироваться"}
                    </MyFormButton>
                    <Link onClick={changeButton} href="#">
                        {!authType ? "Авторизоваться" : "Зарегистрироваться"}</Link>
                </RowButton>
            </List>
        </Form>
    );
};

export default observer(LoginIN);

////////////////// STYLE ////////////////////////////////////////////////////////////
const Form = styled.form`
  width: 100%;
  height: 100%;
`
const List = styled.ul`
  padding-top: 30px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 27px;
`
const RowInput = styled.li`
  display: flex;
  background-color: white;
`
const RowButton = styled.li`
  display: flex;
  gap: 40px;
  flex-direction: column;
`
const Icon = styled.p`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${baseTheme.colors.formAuth.icon.bg};

  @media (max-width: 620px) {
    display: none;
  }
`
const Input = styled.input<{ $test: string }>`
  font-size: 30px;
  padding-left: 10px;
  flex: 1 1 auto;
  height: 70px;
  background-color: ${({$test}) => $test === "false" ? "rgba(239,85,85,0.27)" : null};

  @media (max-width: 425px) {
    font-size: 20px;
  }

  &::placeholder {
    color: ${baseTheme.colors.formAuth.placeholder};
    font-size: 20px;
    padding-left: 10px;
  }
`
const Link = styled.a`
  text-align: center;
  font-size: 20px;
  color: ${baseTheme.colors.formAuth.font};
`
