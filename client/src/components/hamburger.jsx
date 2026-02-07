// React hook imports
// useState → manage component state
// useEffect → run side effects when state changes
import { useEffect, useState } from "react";

// React Router imports
// Link → client-side navigation (no page reload)
// useLocation → get current URL path
import { Link, useLocation } from "react-router-dom";

// Custom component for the header/title
import Header from "./Header.jsx";

// Icon imports from react-icons (FontAwesome pack)
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaPlus,
  FaBox,
  FaInfoCircle,
  FaPhone,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

// Main Hamburger Menu component
function Hamburger() {

  // `open` controls whether the sidebar is visible
  // false = closed, true = open
  const [open, setOpen] = useState(false);

  // Gives us the current route info (e.g. "/profile")
  const location = useLocation();

  // List of menu items (single source of truth)
  // Each object represents ONE menu row
  const menuItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
    { path: "/messages", label: "Messages", icon: <FaEnvelope /> },
    { path: "/add", label: "Add", icon: <FaPlus /> },
    { path: "/products", label: "My products", icon: <FaBox /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
    { path: "/contact", label: "Contact", icon: <FaPhone /> },
    { path: "/help", label: "Help", icon: <FaQuestionCircle /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
    { path: "/logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  // Side effects that depend on `open`
  useEffect(() => {

    // When menu opens → disable background scrolling
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      // When menu closes → restore scrolling
      document.body.style.overflow = "";
    }

    // Cleanup runs when component unmounts OR before next effect
    return () => {
      // Safety reset so scroll never gets stuck
      document.body.style.overflow = "";
    };

  }, [open]); // Effect reruns ONLY when `open` changes

  return (
    <div>

      {/* ===== HAMBURGER ICON (OPEN BUTTON) ===== */}
      <div
        className={`
          cursor-pointer
          text-shadow-lg
          text-bg
          bg-s_bg
          text-3xl
          ${open
            ? "opacity-0 pointer-events-none" // hide when menu open
            : "opacity-100 pointer-events-auto"} // show when menu closed
        `}
        onClick={() => setOpen(true)} // open menu on click
      >
        &#9776; {/* Unicode hamburger icon */}
      </div>

      {/* ===== BACKDROP (BLUR + DARK OVERLAY) ===== */}
      <div
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-xs
          z-40
          transition-opacity
          duration-75
          ease-linear
          ${open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)} // click outside closes menu
      />

      {/* ===== SIDEBAR MENU ===== */}
      <aside
        className={`
          fixed top-0 left-0
          h-screen
          w-full sm:w-1/4
          bg-bg
          shadow
          z-50
          rounded-2xl
          flex flex-col
          transform
          transition-transform
          duration-300
          ease-out
          ${open
            ? "translate-x-0"       // visible
            : "-translate-x-full"}  // slide off-screen
        `}
      >

        {/* ===== SIDEBAR HEADER ===== */}
        <div className="bg-s_bg p-4 h-24 rounded-tr-2xl flex justify-between items-center">
          {/* App title / logo */}
          <Header className="text-4xl sm:text-5xl" />

          {/* Close button */}
          <div
            className="text-4xl text-bg cursor-pointer"
            onClick={() => setOpen(false)}
          >
            &#9776;
          </div>
        </div>

        {/* ===== MENU LIST ===== */}
        <ul className="flex-1 overflow-y-auto">

          {/* Loop through menuItems array */}
          {menuItems.map((item) => {

            // Check if this menu item is the active page
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <li
                key={item.path}
                className={`
                  pl-2
                  text-xl sm:text-2xl
                  font-medium
                  text-text
                  cursor-pointer
                  transition-all
                  duration-75
                  ${isActive
                    ? "bg-s_bg/40 rounded-r-lg ring-4 ring-s_bg/10"
                    : "hover:bg-s_bg/10"}
                `}
              >
                {/* React Router link */}
                <Link
                  to={item.path}
                  className="block p-4 pl-7"
                  onClick={() => setOpen(false)} // close menu on navigation
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    {item.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default Hamburger;
