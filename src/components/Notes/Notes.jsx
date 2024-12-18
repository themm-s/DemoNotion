import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getMyNotes } from "../../lib/redux/actions/noteActions";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    if (!notes.length) {
      dispatch(getMyNotes());
    }
  }, [dispatch, notes.length]);

  return (
    <div className="flex flex-col min-h-screen items-center pt-20">
      <NavBar />
      <h1 className="text-2xl mb-4">Мои заметки</h1>
      <Link to="/create-note" className="mb-4 text-blue-500">
        Создать новую заметку
      </Link>
      <div className="max-w-screen-lg w-full">
        {notes.length === 0 ? (
          <p>У вас пока нет заметок.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg">{note.title}</h2>
                <p className="text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <Link to={`/edit-note/${note.id}`} className="mr-4">
                  ✍️ Редактировать
                </Link>
                <button
                  onClick={() => dispatch(deleteNote(note.id))}
                  className="text-red-500"
                >
                  🗑 Удалить
                </button>
                <Link to={`/view-note/${note.id}`} className="ml-4">
                  Просмотреть
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notes;
