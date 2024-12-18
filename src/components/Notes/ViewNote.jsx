import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getMyNotes } from "../../lib/redux/actions/noteActions";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { notes, loading, ready } = useSelector((state) => state.notes);

  const note = useMemo(() => notes.find((n) => n.id === id), [id, notes]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!notes.length) {
      dispatch(getMyNotes());
    }
  }, [dispatch, notes.length]);

  const isReady = !loading && ready;

  const handleDelete = () => {
    dispatch(deleteNote(id));
    navigate("/notes");
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (!note && isReady) {
    return <Navigate to="/404" />;
  }

  const createdAtFormatted = new Date(note.createdAt).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="flex mb-4">
          <button
            onClick={() => navigate(`/edit-note/${note.id}`)}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            ✍️ Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            🗑 Удалить
          </button>
        </div>
        <pre className="whitespace-pre-wrap border p-4 w-full max-w-screen-lg bg-gray-100 rounded shadow">
          {note.body || "Нет содержания."}
        </pre>
        <p className="text-gray-500 mt-2">Создано: {createdAtFormatted}</p>
        <button
          onClick={() => navigate("/notes")}
          className="mt-4 text-blue-500"
        >
          Назад
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ViewNote;
