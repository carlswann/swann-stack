// Why are these here?
// Because these values are used at other points in the app.
// Yes, we could just import the entire routes object but why
// use such a large structure when we only need to know one
// thing: which route do i need to send the user
export const BASE_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const MAIN_ROUTE = '/catalog/categories';
export const CATCH_ALL_ROUTE = '*';
