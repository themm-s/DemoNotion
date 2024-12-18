import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../lib/redux/actions/userActions";

const Navbar = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <h2 className="text-lg">
          {user ? `Привет, ${user.email}` : "Добро пожаловать!"}
        </h2>
        <div className="flex items-center space-x-4">
          <Link to="/home" className="hover:text-gray-300">
            Главная
          </Link>
          <Link to="/notes" className="hover:text-gray-300">
            Заметки
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400"
            >
              Выйти
            </button>
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
