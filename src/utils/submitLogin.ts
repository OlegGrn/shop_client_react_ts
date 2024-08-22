import {UserResponse} from "../types/response/AuthResponseType";
import React from "react";
import {IDataForm} from "../components/LoginIN";
import {regEmail, regPassword} from "./regularExp";
import {UsersStore} from "../store/usersStore";


export async function request(email: string | boolean,
                              password: string | boolean,
                              repeat: string | boolean,
                              user: UsersStore,
                              authType: boolean,
) {
    // если данные не валидны будет null
    if (typeof email === "boolean" || typeof password === "boolean") return null
    // запрос в зависимости от authType (логин или регистрация)
    if (authType && email && password) {
        return await user.login(email, password)
    } else if (!authType && repeat && email && password) {
        return await user.registration(email, password)
    } else return null
}


// устанавливаем токены + очищаем форму + закрываем модальное окно (setOpen)_
export function setToken(response: UserResponse | null,
                         form: HTMLFormElement,
                         setResMessage: React.Dispatch<React.SetStateAction<string>>,

                         // убираем из-за глюка кнопки
                         setOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
) {
    //очистка формы если был ответ не null
    if (response) {
        Array
            .from(form.elements)
            .forEach((el: any) => (el.value = null))
    }

    // сохраняем accessToken и получаем сообщения для Title
    if (response?.status === 200) {
        if (response.accessToken) localStorage.setItem("token", response.accessToken)
        setResMessage(response.message) // устанавливаем сообщение

        // будет глюк с иконкой логин, так как clickClose до конца не отработал и будет закрывать все модалки

        if (setOpen) {
            setOpen(e => !e)
        }  //закрываем модальное окно//

    } else if (response?.message) {
        setResMessage(response.message)
    }
}

// Валидация формы. Если все хорошо, на выходе строки, если нет - булевые false
export function validFormData(form: any): IDataForm {

    const formData = new FormData(form)

    let email: string | boolean = false
    let password: string | boolean = false
    let repeat: boolean | string = false

    const emailForm = formData.get("email")
    const passwordForm = formData.get("password")
    const repeatForm = formData.get("repeat")

    if (emailForm) {
        if (typeof emailForm === "string") {
            let test = regEmail.test(emailForm)
            email = test ? emailForm : false;

        }
    }
    if (passwordForm) {
        if (typeof passwordForm === "string") {
            let test = regPassword.test(passwordForm)
            password = test ? passwordForm : false;
        }
    }
    if (repeatForm) {
        if (typeof repeatForm === "string") {
            repeat = (repeatForm === passwordForm);
        }
    }
    return {email, repeat, password}
}






