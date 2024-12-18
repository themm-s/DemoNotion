import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center mx-auto">
        <h2 className="text-lg">
          {storedUser ? `Привет, ${storedUser.email}` : "Добро пожаловать!"}
        </h2>
        <div>
          <Link to="/home" className="mr-4">
            Главная
          </Link>
          <Link to="/notes" className="mr-4">
            Заметки
          </Link>
          {storedUser ? (
            <button onClick={handleLogout} className="text-red-500">
              Выйти
            </button>
          ) : (
            <Link to="/login" className="text-blue-500">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
