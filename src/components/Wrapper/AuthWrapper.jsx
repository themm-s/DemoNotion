import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSession } from "../../lib/redux/actions/userActions";

function AuthWrapper({ children }) {
  const { ready } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ready) {
      dispatch(getActiveSession());
    }
  }, [dispatch, ready]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return children;
}

export default AuthWrapper;
