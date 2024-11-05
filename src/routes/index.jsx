import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../AdminPages/Dashboard"));
const Orders = lazy(() => import("../AdminPages/Orders"));
const ProductsAll = lazy(() => import("../AdminPages/ProductsAll"));
const SingleProduct = lazy(() => import("../AdminPages/SingleProduct"));
const AddProduct = lazy(() => import("../AdminPages/AddProduct"));
const Customers = lazy(() => import("../AdminPages/Customers"));
const Chats = lazy(() => import("../AdminPages/Chats"));
const Profile = lazy(() => import("../AdminPages/Profile"));
const Settings = lazy(() => import("../AdminPages/Settings"));
const Page404 = lazy(() => import("../AdminPages/404"));
const Blank = lazy(() => import("../AdminPages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/all-products",
    component: ProductsAll,
  },
  {
    path: "/add-product",
    component: AddProduct,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/chats",
    component: Chats,
  },
  {
    path: "/manage-profile",
    component: Profile,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
