import { useRef, useEffect, useState } from "react";

function Hamburger({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const menuRef = useRef(null);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },


    { id: "messages", label: "Messages" },
    { id: "add", label: "Add" },
    { id: "products", label: "My products" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "help", label: "Help" },
    { id: "settings", label: "Settings" },
    { id: "logout", label: "Logout", danger: true },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      {!open && (
        <div
          className="cursor-pointer p-4 bg-gray-200 hover:bg-gray-300"
          onClick={() => setOpen(true)}
        >
          &#9776;
        </div>
      )}

      {open && (
        <ul className="mt-0 w-40 bg-white border shadow">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActivePage(item.id); // local highlight
                onSelect(item.id);      // 🔥 send to App
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer
                ${activePage === item.id ? "bg-gray-200 font-bold" : ""}
                ${item.danger ? "text-red-500" : ""}`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Hamburger;
