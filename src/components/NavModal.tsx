import React, {FC, useContext} from 'react';
import {Context} from "../contexts";
import MyModal from "./ui/MyModal";
import {BASKET_ROUTE} from "../utils/consts";
import MyMiniModal from "./ui/MyMiniModal";
import LoginOut from "./LoginOut";
import BasketIN from "./BasketIN";
import LoginIN from "./LoginIN";


interface INavModal {
    children?: React.ReactNode
    openLogin: boolean
    openBasket: boolean
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenBasket: React.Dispatch<React.SetStateAction<boolean>>
}

const NavModal: FC<INavModal> = (
    {
        openLogin,
        openBasket,
        setOpenBasket,
        setOpenLogin
    }
) => {



    const store: any = useContext(Context)
    const isAuth = store.user.isAuth()

    return (
        <>
            {openLogin && isAuth &&
                <MyMiniModal setOpen={setOpenLogin}>
                    <LoginOut/>
                </MyMiniModal>
            }
            {openBasket && isAuth &&
                <MyMiniModal setOpen={setOpenBasket}>
                    <BasketIN path={BASKET_ROUTE}/>
                </MyMiniModal>
            }
            {(openLogin || openBasket) && !isAuth &&
                <MyModal setOpen={openLogin? setOpenLogin: setOpenBasket}>
                    <LoginIN setOpen={setOpenLogin}/>
                </MyModal>
            }

        </>
    );
};

export default NavModal;


