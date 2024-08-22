import AdminStore from "./adminStore";
import {IPayload} from "../types/userTypes";
import {makeObservable, observable, runInAction} from "mobx";
import {UserResponse} from "../types/response/AuthResponseType";
import {IBaseOption, IMesStatus} from "./common_class/BaseStore";
import BasicHttpService from "../http/http_services/basicHttpService";


interface IUserOptions {
    path_login: string,
    path_logOut: string,
    path_registration: string,
    path_authStart: string
}

export class UsersStore extends AdminStore {

    _isAuth: boolean;
    _user: IPayload | null;
    path_login: string;
    path_logOut: string;
    path_registration: string;
    path_authStart: string


    constructor(options: IBaseOption | {}, add: IUserOptions) {
        super(options);
        this.path_login = add.path_login
        this.path_logOut = add.path_logOut
        this.path_registration = add.path_registration
        this.path_authStart = add.path_authStart

        this._isAuth = false
        this._user = null

        makeObservable(this, {
            _isAuth: observable,
            _user: observable
        })
    }

    setUser(payload: IPayload | null): void {
        runInAction(() => {
            this._user = payload
        })
    }

    getUser(): null | IPayload {
        return this._user
    }

    setAuth(bool: boolean): void {
        runInAction(() => {
            this._isAuth = bool
        })
    }

    isAuth(): boolean {
        return this._isAuth
    }

    async login(email: string, password: string): Promise<UserResponse> {
        try {
            this.setLoading(true)
            const response = await BasicHttpService.login(email, password, this.path_login)

            const payload = response.data.payload
            this.setUser(payload);
            this.setAdmin(payload.roles.includes('ADMIN'));
            this.setAuth(true);

            const accessToken = response.data.accessToken
            localStorage.setItem("token", accessToken)
            return {accessToken, status: response.status, message: "Авторизован"}

        } catch (err: any) {
            return {
                accessToken: "",
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async registration(email: string, password: string): Promise<UserResponse> {
        try {
            this.setLoading(true)
            const response = await BasicHttpService.registration(email, password, this.path_registration)

            const payload = response.data.payload;
            const accessToken = response.data.accessToken;
            this.setUser(payload);
            this.setAuth(true);
            localStorage.setItem("token", accessToken);

            return {accessToken, status: response.status, message: "Зарегистрирован"}
        } catch (err: any) {
            return {
                accessToken: "",
                message: err.response?.data?.message ?? err.message ?? "",
                status: err.response?.status
            }

        } finally {
            this.setLoading(false)

        }
    }

    async logOut(): Promise<IMesStatus> {
        try {
            this.setLoading(true)
            let response = await BasicHttpService.logOut(this.path_logOut)

            this.setAuth(false);
            this.setUser(null)
            this.setAdmin(false)
            localStorage.setItem("token", "")

            return {
                message: response.data.message,
                status: response.status
            }
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "Ошибка",
                status: err.response?.status ?? err.status
            }
        } finally {
            this.setLoading(false)
        }
    }

    async authStart(): Promise<IMesStatus> {
        try {
            //in response.data: payload and accessToken
            const response = await BasicHttpService.authStart(this.path_authStart)

            if (response.status === 200) {
                const payload = response.data.payload

                this.setAuth(true)
                this.setUser(payload);
                this.setAdmin(payload.roles.includes("ADMIN"))
                localStorage.setItem("token", response.data.accessToken)
            }
            return {
                message: JSON.stringify(response.data.payload),
                status: response.status
            }
        } catch (err: any) {
            return {
                message: err.response?.data?.message ?? err.message ?? "Ошибка",
                status: err.response?.status ?? err.status
            }
        }finally {

        }
    }

}

export const user = new UsersStore({}, {
    path_login: '/user/login',
    path_logOut: '/user/logout',
    path_registration: '/user/registration',
    path_authStart: '/user/auth'
})































