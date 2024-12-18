import React from "react";
import Navbar from "./Layout/NavBar";
import Footer from "./Layout/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const storedUser = useSelector((state) => state.user.user);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center pt-20">
        <h1 className="text-3xl font-bold mb-6">Моя страничка</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <p className="text-lg mb-2">
            <strong>Email:</strong> {storedUser.email}
          </p>
          <p className="text-lg mb-4">
            <strong>Дата регистрации:</strong>{" "}
            {new Date(storedUser.createdAt).toLocaleDateString("ru-RU")}
          </p>
          <a
            href="/create-note"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Создать заметку
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
