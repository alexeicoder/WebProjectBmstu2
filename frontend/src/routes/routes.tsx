export const enum ROUTES {
    WELCOME = '/',
    HOME = '/home',
    SIGN_IN = '/signin',
    SIGN_UP = '/register',
    FEED = '/feed',
    PROFILE = '/profile/',
    SETTINGS = '/settings',
    BOOKS = '/books',
    FRIENDS = '/friends',
    BOOK_VIEW = '/book/view/',
    AUTHOR_VIEW = '/author/view/',
    SERIES_VIEW = '/series/view',
    CART = '/cart',
    ORDERS = '/orders'
}

const SERVICE_AUTH_BASE_URL = 'http://localhost:3000/api/auth';
export const enum SERVICE_AUTH {
    // AUTH
    LOGIN = SERVICE_AUTH_BASE_URL + '/login',
    REGISTER = SERVICE_AUTH_BASE_URL + '/register',
    SIGN_OUT = SERVICE_AUTH_BASE_URL + '/signout',
    // TOKEN
    VALIDATE_TOKEN = SERVICE_AUTH_BASE_URL + '/validatetoken',
    REFRESH_TOKEN = SERVICE_AUTH_BASE_URL + '/refresh',
    // FIND
    FIND_USER_ID = SERVICE_AUTH_BASE_URL + '/find/user/id/',
    FIND_USER_LOGIN = SERVICE_AUTH_BASE_URL + '/find/user/login/',
    FIND_ALL = SERVICE_AUTH_BASE_URL + '/find/all',
    // UPDATE
    UPDATE = SERVICE_AUTH_BASE_URL + '/update/user/',
    // DELETE
    DELETE = SERVICE_AUTH_BASE_URL + '/delete/user/'
}

const SERVICE_FOOD_BASE_URL = 'http://localhost:3200/api/food';
export const enum SERVICE_FOOD {
    FIND_ALL = SERVICE_FOOD_BASE_URL + '/find/all',
    FIND_CATEGORY_ALL = SERVICE_FOOD_BASE_URL + '/find/category/all',
}

const SERVICE_ORDER_BASE_URL = 'http://localhost:3100/api/order';
export const enum SERVICE_ORDER {
    CREATE = SERVICE_ORDER_BASE_URL + '/create',
    FIND_OWNER_ID = SERVICE_ORDER_BASE_URL + '/find/owner/id/',
}