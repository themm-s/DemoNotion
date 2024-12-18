import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getActiveSession } from "../../lib/redux/actions/userActions";

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useSelector((state) => state.user);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
