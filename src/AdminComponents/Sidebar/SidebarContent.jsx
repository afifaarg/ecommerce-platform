import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route, Link } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";

function SidebarContent() {
  return (
    <div className="py-4 flex flex-col text-primary">
      <a
        className="text-center text-lg border-b border-primary font-bold p-4 mx-auto "
        href="#"
      >
        SLEEPWELL ADMIN
      </a>
      <ul className="mt-6">
        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/administration-dashboard"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M21 16V4H3v12h18m0-14a2 2 0 012 2v12a2 2 0 01-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 01-2-2V4c0-1.11.89-2 2-2h18M5 6h9v5H5V6m10 0h4v2h-4V6m4 3v5h-4V9h4M5 12h4v2H5v-2m5 0h4v2h-4v-2z" />
            </svg>
            <span className="ml-4">Tableau de Bord</span>
          </Link>
        </li>

        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/orders"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M20 22H4a1 1 0 01-1-1V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z" />
            </svg>
            <span className="ml-4">Commandes</span>
          </Link>
        </li>

        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/categories"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
            </svg>
            <span className="ml-4">Liste des categories</span>
          </Link>
        </li>
        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/products"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-208 0H400v-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16z" />
            </svg>
            <span className="ml-4">Liste des produits</span>
          </Link>
        </li>

        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="admin/buying-bills-page"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              data-name="Layer 1"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M9.5 10.5H12a1 1 0 000-2h-1V8a1 1 0 00-2 0v.55a2.5 2.5 0 00.5 4.95h1a.5.5 0 010 1H8a1 1 0 000 2h1v.5a1 1 0 002 0v-.55a2.5 2.5 0 00-.5-4.95h-1a.5.5 0 010-1zM21 12h-3V3a1 1 0 00-.5-.87 1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0A1 1 0 002 3v16a3 3 0 003 3h14a3 3 0 003-3v-6a1 1 0 00-1-1zM5 20a1 1 0 01-1-1V4.73l2 1.14a1.08 1.08 0 001 0l3-1.72 3 1.72a1.08 1.08 0 001 0l2-1.14V19a3 3 0 00.18 1zm15-1a1 1 0 01-2 0v-5h2z" />
            </svg>
            <span className="ml-4">Liste des Bons d'Achat</span>
          </Link>
        </li>
        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/customers"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 1000 1000"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M1000 940H776V790c0-36-10-63-30-81s-71.333-47.667-154-89c26.667-20 40-48 40-84 0-10.667-4.333-21.667-13-33-8.667-11.333-15-28.333-19-51-1.333-5.333-6-10.667-14-16s-12.667-19.333-14-42c0-16 4-26 12-30-4-22.667-6.667-42.667-8-60-2.667-25.333 5-51.333 23-78s49.667-40 95-40 77.333 13.333 96 40 26.667 52.667 24 78l-8 60c8 4 12 14 12 30-1.333 22.667-6 36.667-14 42-8 5.333-12.667 10.667-14 16-4 22.667-10.333 39.667-19 51-8.667 11.333-13 22.333-13 33 0 28 7 50 21 66s39.667 32 77 48c74.667 30.667 118 57.333 130 80 4 5.333 7 25.667 9 61s3.667 69 5 101v48M512 678c121.333 52 182 93.333 182 124v138H0V756c0-29.333 28-55.333 84-78 50.667-21.333 85.333-42.667 104-64s28-50.667 28-88c0-13.333-6.333-28-19-44s-21-38.667-25-68c-1.333-6.667-7.333-14-18-22s-17.333-26.667-20-56c0-9.333 1-17 3-23s4.333-10.333 7-13l4-2c-4-30.667-7.333-58-10-82-2.667-33.333 8.333-67.667 33-103s67-53 127-53 102.333 17.667 127 53 35.667 69.667 33 103l-10 82c9.333 5.333 14 18 14 38-2.667 29.333-9.333 48-20 56s-16.667 15.333-18 22c-4 29.333-12.333 52-25 68s-19 30.667-19 44c0 37.333 9.333 66.667 28 88s53.333 42.667 104 64" />
            </svg>
            <span className="ml-4">Liste des Utilisateurs</span>
          </Link>
        </li>
        <hr className="bg-[#000066]" />
        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/contact-forms"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2 22a8 8 0 1116 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm10 4h4v2h-4v-2zm-3-5h7v2h-7v-2zm2-5h5v2h-5V7z" />
            </svg>
            <span className="ml-4">Formulaires Contact</span>
          </Link>
        </li>

        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/settings"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M19.148 2.971A2.008 2.008 0 0017.434 2H6.566c-.698 0-1.355.372-1.714.971L2.143 7.485A.995.995 0 002 8a3.97 3.97 0 001 2.618V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.382A3.97 3.97 0 0022 8a.995.995 0 00-.143-.515l-2.709-4.514zm.836 5.28A2.003 2.003 0 0118 10c-1.103 0-2-.897-2-2 0-.068-.025-.128-.039-.192l.02-.004L15.22 4h2.214l2.55 4.251zM10.819 4h2.361l.813 4.065C13.958 9.137 13.08 10 12 10s-1.958-.863-1.993-1.935L10.819 4zM6.566 4H8.78l-.76 3.804.02.004C8.025 7.872 8 7.932 8 8c0 1.103-.897 2-2 2a2.003 2.003 0 01-1.984-1.749L6.566 4zM10 19v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.142c.321.083.652.142 1 .142a3.99 3.99 0 003-1.357c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357A3.99 3.99 0 0018 12c.348 0 .679-.059 1-.142V19h-3z" />
            </svg>
            <span className="ml-4">Etat de stock</span>
          </Link>
        </li>

        <li className="relative px-12 py-2 hover:bg-gray-50 hover:bg-opacity-30">
          <Link
            exact
            to="/admin/logout"
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            activeClassName="text-gray-800 dark:text-gray-100"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path
                fill="currentColor"
                d="M2 14h14v2H0V0h2zm2.5-1a1.5 1.5 0 11.131-2.994l1.612-2.687a1.5 1.5 0 112.514 0l1.612 2.687a1.42 1.42 0 01.23-.002l2.662-4.658a1.5 1.5 0 111.14.651l-2.662 4.658a1.5 1.5 0 11-2.496.026L7.631 7.994a1.42 1.42 0 01-.262 0l-1.612 2.687A1.5 1.5 0 014.5 13z"
              />
            </svg>
            <span className="ml-4">Statistiques de Produits</span>
          </Link>
        </li>

        <hr className="customeDivider mx-4 my-5" />
      </ul>

      <div className="px-6 w-full flex ">
        <button className="bg-primary text-white p-2 mx-auto  rounded-lg">
          Deconnexion
          <span className="ml-2 bg-primary" aria-hidden="true">
            +
          </span>
        </button>
      </div>
    </div>
  );
}

export default SidebarContent;
