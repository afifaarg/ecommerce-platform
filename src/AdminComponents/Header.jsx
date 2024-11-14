import React, { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { Link } from "react-router-dom";
import response from "../utils/demo/profileData";

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="z-40 py-4 bg-primary shadow-bottom ">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-secondary ">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          M
        </button>
        {/* <!-- Search input --> */}

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 012-2 2 2 0 012 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 01-2 2 2 2 0 01-2-2" />
              </svg>
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem className="justify-between">
                <Link to={"admin/contact-forms"}>Formulaire Contact</Link>
              </DropdownItem>
              <DropdownItem className="justify-between">
                <Link to={"admin/orders"}>Ventes</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={"admin/etat-stock"}>Stock</Link>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
