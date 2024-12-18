import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { useDispatch } from "react-redux";
import { createNote } from "../../lib/redux/actions/noteActions";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Название заметки не может быть пустым.");
      return;
    }

    const newNote = {
      title: title.trim(),
      body: body.trim(),
    };

    dispatch(createNote(newNote.title, newNote.body));
    navigate("/notes");
  };

  return (
    <div className="flex flex-col min-h-screen items-center pt-20">
      <NavBar />
      <h1 className="text-2xl mb-4">Создание заметки</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название заметки"
          required
          className="border p-2 w-full mb-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Содержание заметки"
          required
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </form>
      <button onClick={() => navigate("/notes")} className="mt-4 text-blue-500">
        Назад
      </button>
      <Footer />
    </div>
  );
};

export default CreateNote;
