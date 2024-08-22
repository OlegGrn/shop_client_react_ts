///// для выбора вывода количества показываемых товаров на странице с товарами (select)
export const QUANTITY_GOODS_LIMIT = [1, 2, 3, 6, 12, 18, 24]
export const DEFAULT_LIMIT = 3

///// Переменные для создания товара администратором
export const QUANTITY_FOTO_LOADING = 5


////// для HTTP
export const BASE_URL = 'http://localhost:5000/'


////// для формы FormData ProductAdd переменные NAME инпутов
export const ID_TYPE = "id_type";
export const ID_CATEGORY = "id_category";
export const ID_SIZE = "id_size";
export const QUANTITY = "quantity";
export const NAME = "name";
export const DESCRIPTION = "description";
export const PRICE = "price";
export const IMG = "img";
export const SIZES = "sizes"
//////////////////////////////////////////////////////////////


export const ADMIN_ROUTE: string = '/admin';

export const SHOP_ROUTE: string = '/shop/*';
export const PRODUCT_ONE_ROUTE: string = '/product';
export const BASKET_ROUTE: string = '/basket';
export const CONTACT_ROUTE: string = '/contact';
export const ABOUT_ROUTE: string = '/about';


//////////////////////////////////////////////////////////////
export const NoData: string = "Нет данных"

////////// Для бургера ID  //////////////////////////////////////
export const ID_MENU_LIST = "menu_list_burger"
export const CLASS_LOCK = "lock"

// меню список
export const MENU_LIST = [
    {
        name: 'Oписание',
        path: ABOUT_ROUTE
    },
    {
        name: 'Магазин',
        path: SHOP_ROUTE
    },
    {
        name: 'Контакты',
        path: CONTACT_ROUTE
    }
]








