import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMyNotes, updateNote } from "../../lib/redux/actions/noteActions";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { notes, loading, ready } = useSelector((state) => state.notes);

  const note = useMemo(() => notes.find((n) => n.id === id), [id, notes]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!notes.length) {
      dispatch(getMyNotes());
    }
  }, [dispatch, notes.length]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  const isReady = !loading && ready;

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (!note && isReady) {
    return <Navigate to="/404" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Название заметки не может быть пустым.");
      return;
    }

    dispatch(updateNote(id, { title, body }));

    navigate(`/view-note/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center pt-20">
        <h1 className="text-2xl mb-4">Редактирование заметки</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-2">Название:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Содержимое:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border p-2 w-full"
              rows="5"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mr-2"
            >
              Сохранить
            </button>
            <button
              onClick={() => navigate("/notes")}
              className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition w-full"
            >
              Назад
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditNote;
