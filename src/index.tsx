import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Context} from "./contexts";
import {categories} from "./store/categoryStore";
import {types} from "./store/typeStore";
import {sizes} from "./store/sizeStore";
import {admins} from "./store/adminStore";
import {user} from "./store/usersStore";
import {products} from "./store/productStore";
import {burger} from "./store/burgerStore";
import "./fonts/fonts.css"
import {baskets} from "./store/basketStore";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={
        {user, burger, types, categories, sizes, products, admins, baskets}
    }>
        <App/>
    </Context.Provider>
);



