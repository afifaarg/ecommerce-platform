/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/orders",
    name: "Orders",
  },
  {
    name: "Products",
    routes: [
      {
        path: "/app/all-products",
        name: "All Products",
      },
      {
        path: "/app/add-product",
        name: "Add Product",
      },
    ],
  },
  {
    path: "/app/customers",
    name: "Customers",
  },
  {
    path: "/app/chats",
    name: "Chats",
  },
  {
    path: "/app/manage-profile",
    name: "Profile",
  },
  {
    path: "/app/settings",
    name: "Settings",
  },
  {
    path: "/app/logout",
    name: "Logout",
  },
];

export default routes;
