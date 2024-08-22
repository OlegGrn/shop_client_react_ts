import React from 'react';
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CONTACT_ROUTE,
    PRODUCT_ONE_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import OneProductPage from "./pages/OneProductPage";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LotProductPage from "./pages/LotProductPage";


export const adminRouter = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    }
]
export const authRoutes = [

    {
        path: BASKET_ROUTE,
        component: <Basket/>
    }
]

export const publicRoutes = [
    {
        path: ABOUT_ROUTE,
        component: <About/>
    },
    {
        path: CONTACT_ROUTE,
        component: <Contact/>
    },
    {
        path: SHOP_ROUTE,
        component: <Shop/>
    },
    {
        path: '/*',
        component: <About/>
    },
    {
        path: PRODUCT_ONE_ROUTE + '/:id',
        component: <OneProductPage/>
    },
]

export const shopRoutes = [
    {
        path: PRODUCT_ONE_ROUTE + '/:id',
        component: <OneProductPage/>
    },
    {
        path: '/*',
        component: <LotProductPage/>
    },
]