# shop_client_react_ts
Клиентская часть приложения на React. Серверная часть в shop_server_express.
Приложение масштабируемое, при желании можно добавить функционал и страницы.
Приложение адаптивно до ширины экрана 320px.
Store на Mobx, Http запросы через Axios, авторизация посредством JWT.
Запросы на сервер осуществляются через два файла в паке src/http/http_services:
 - ProductServices.ts (для запросов по созданию/удалению/получению продуктов)
 - basicHttpService.ts (для всех остальных)
 - 
Взаимодействуют с ними только файлы ...Store.ts из папки src/store. Сами компоненты уже взаимодействуют со своими ..Store.ts.
Переменные компонентов фронтенда находятся в src/utils/consts.ts
