# shop_client_react_ts
Клиентская часть приложения на React. Серверная часть в shop_server_express.

Приложение масштабируемое, при желании можно добавить функционал и страницы.

Приложение адаптивно до ширины экрана 320px.

Store на Mobx, Http запросы через Axios, авторизация посредством JWT.

Запросы на сервер осуществляются через два файла в паке src/http/http_services:
 - ProductServices.ts (для запросов по созданию/удалению/получению продуктов)
 - basicHttpService.ts (для всех остальных)

Взаимодействуют с ними только файлы ...Store.ts из папки src/store. Сами компоненты уже взаимодействуют со своими ..Store.ts.
Переменные компонентов фронтенда находятся в src/utils/consts.ts

# Ссылка на скачивание репозитария:
https://github.com/OlegGrn/shop_client_react_ts.git

Из любого терминала командной строки, находясь в скаченной паке, для установки приложения вводим команду
### `npm instal`
И для запуска приложения
### `npm start`




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The currentPage will reload if you make edits.\
You will also see any lint errors in the console.
