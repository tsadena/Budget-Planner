import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Avatar({ src, name }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {src ? (
          <img src={src} alt={`${name} avatar`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg font-medium text-gray-600">{name ? name[0].toUpperCase() : "U"}</span>
        )}
      </div>

      <div>
        <div className="text-sm font-semibold">{name || "Unknown User"}</div>
        <div className="text-xs text-gray-400">Member</div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const goToSection = (id) => {
    const scrollTo = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard");

      
      setTimeout(scrollTo, 180);
    } else {
      scrollTo();
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("bulga_user");
    navigate("/login");
  };

  
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      const updated = { ...(user || {}), profilePhoto: base64 };
      setUser(updated);
      localStorage.setItem("bulga_user", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const navBtnClass = "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700";

  return (
    <aside className="w-72 bg-white border-r min-h-screen flex flex-col">
      <div className="p-4 border-b">
        <label className="flex items-center gap-3 cursor-pointer">
          <input onChange={handleFile} type="file" accept="image/*" className="hidden" />
          <Avatar src={user?.profilePhoto} name={user?.name || user?.email} />
        </label>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        <button onClick={() => goToSection("overview-section")} className={navBtnClass}>Dashboard</button>
        <button onClick={() => goToSection("income-section")} className={navBtnClass}>Income</button>
        <button onClick={() => goToSection("expense-section")} className={navBtnClass}>Expense</button>
        <button onClick={() => goToSection("goals-section")} className={navBtnClass}>Goal Tracking</button>
      </nav>

      <div className="p-4">
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">Logout</button>
      </div>
    </aside>
  );
}
