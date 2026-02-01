import { useRef, useEffect, useState } from "react";

function Hamburger() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e){
            if(menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        if(open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    return (
        <div className="relative" ref={menuRef}>
            {!open && (
                <div className="cursor-pointer p-4 bg-gray-200 hover:bg-gray-300"
                    onClick={() => setOpen(!open)}>
                    {/* Hamburger Icon */}
                    &#9776; 
                </div>
            )}
            {/* Menu List */}
            {open && (
                <ul className="absolute left-0 mt-0 w-40 bg-white border shadow">
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Home</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Messages</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Add</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">My products</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">About</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Contact</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Help</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
                </ul>
            )}
        </div>
    );
}
export default Hamburger;