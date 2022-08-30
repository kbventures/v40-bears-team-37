import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/Auth/PrivateRoute";
import Search from "routes/Search";
import Settings from "routes/Settings";
import PublicRoute from "components/Auth/PublicRoute";
import Login from "routes/Login";
import Signup from "routes/Signup";
import CalendarPage from "routes/Calender";
<<<<<<< HEAD
import { useAuth } from "context/AuthContext";
import Loader from "components/Loader/Loader";
import PageNotFound from "routes/404";
=======
import LessonModal from "components/LessonModal"
import LessonModalProvider from "context/LessonModalContext";
>>>>>>> 1820c39 (Modal can now open and close)

function App() {
  const { isCheckingAuth } = useAuth();

  if (isCheckingAuth) return <Loader />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LessonModalProvider>
            <PrivateRoute>
              <CalendarPage />
              <LessonModal />
            </PrivateRoute>
          </LessonModalProvider>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
