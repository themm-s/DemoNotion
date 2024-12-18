//порт 3001 для Сергея Александровича
// Допы: Хранить пароли в базе в захешированном виде
// Провека на дубликат (при регистрации)
import "./index.css";
import { Route } from "react-router-dom";
import RegistrationForm from "./components/Auth/RegistrationForm";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import Notes from "./components/Notes/Notes";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import ViewNote from "./components/Notes/ViewNote";
import ErrorPage from "./components/ErrorPage";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { WelcomePage } from "./components/Welcome/WelcomePage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <Wrapper>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-note"
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-note/:id"
        element={
          <ProtectedRoute>
            <EditNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-note/:id"
        element={
          <ProtectedRoute>
            <ViewNote />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<WelcomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Wrapper>
  );
}

export default App;
