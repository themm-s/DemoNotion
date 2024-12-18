import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-4">404 - Страница не найдена</h1>
      <p className="mb-4">К сожалению, запрашиваемая страница не существует.</p>
      {storedUser ? (
        <Link to="/home" className="text-blue-500">
          Вернуться на домашнюю страницу
        </Link>
      ) : (
        <Link to="/login" className="text-blue-500">
          Вернуться на страницу входа
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
