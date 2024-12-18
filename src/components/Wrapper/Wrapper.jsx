import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "../../lib/redux/store";
import AuthWrapper from "./AuthWrapper";

export const Wrapper = ({ children }) => (
  <>
    <Provider store={store}>
      <AuthWrapper>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex items-center justify-center">
              <Routes>{children}</Routes>
            </div>
          </div>
        </Router>
      </AuthWrapper>
    </Provider>
  </>
);
