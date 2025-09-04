import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-yellow-100 px-4 py-2 rounded-full font-medium hover:bg-orange-300 transition"
      >
        Hello, {user.full_name}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-red-800 rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              navigate("/favourites");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-yellow-100 hover:bg-gray-100 hover:text-red-800"
          >
            Favourites
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-yellow-100 hover:bg-gray-100 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
