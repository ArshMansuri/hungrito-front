import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/USER/Home/Home";
import Login from "./Pages/USER/Login/Login";
import SignUp from "./Pages/USER/SignUp/SignUp";
import ResLogin from "./Pages/RESTAURANT/ResLogin/ResLogin";
import ResSignUp from "./Pages/RESTAURANT/ResSignUp/ResSignUp1/ResSignUp";
import Temp from "./temp/Temp";
import ResSignUp2 from "./Pages/RESTAURANT/ResSignUp/ResSignUp2/ResSignUp2";
import ResSignUp3 from "./Pages/RESTAURANT/ResSignUp/ResSignUp3/ResSignUp3";
import ResFirstVerify from "./Pages/RESTAURANT/ResSignUp/ResFirstVerify/ResFirstVerify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLoad } from "./redux/actions/user";
import AuthProtected from "./Components/ProtectedRoute/AuthProtected";
import { resLoad } from "./redux/actions/restaurant";
import Food from "./Pages/USER/Food/Food";
import AuthResProtected from "./Components/ProtectedRoute/AuthResProtected";

function App() {
  const dispatch = useDispatch();

  const { isAuther, isLoading } = useSelector((state) => state.user);
  const isRestuAuther = useSelector((state) => state.restu?.isRestuAuther);
  const isResLoading = useSelector((state) => state.restu?.isLoading);

  useEffect(() => {
    if (localStorage.getItem("isUser") === "true") {
      dispatch(userLoad());
    }
    if (localStorage.getItem("isRestu") === "true") {
      dispatch(resLoad());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>

        {/* ================= User Auth Routes ==================*/}
        <Route
          path="/"
          element={<Home isAuther={isAuther} isLoading={isLoading} />}
        />
        <Route
          element={<AuthProtected isAuther={isAuther} isLoading={isLoading} />}
        >
          <Route
            path="/login"
            element={<Login isAuther={isAuther} isLoading={isLoading} />}
          />
          <Route
            path="/signup"
            element={<SignUp isAuther={isAuther} isLoading={isLoading} />}
          />
        </Route>

        {/* ================= Restaurant Auth Routes ==================*/}
        <Route
          path="/res/verify"
          element={
            <ResFirstVerify
              isRestuAuther={isRestuAuther}
              isResLoading={isResLoading}
            />
          }
        />
        <Route
          element={
            <AuthResProtected
              isRestuAuther={isRestuAuther}
              isResLoading={isResLoading}
            />
          }
        >
          <Route
            path="/res/login"
            element={
              <ResLogin
                isRestuAuther={isRestuAuther}
                isResLoading={isResLoading}
              />
            }
          />
          <Route
            path="/res/signup/:email"
            element={
              <ResSignUp
                isRestuAuther={isRestuAuther}
                isResLoading={isResLoading}
              />
            }
          />
          <Route
            path="/res/signup/p2/:email"
            element={
              <ResSignUp2
                isRestuAuther={isRestuAuther}
                isResLoading={isResLoading}
              />
            }
          />
          <Route
            path="/res/signup/p3/:email"
            element={
              <ResSignUp3
                isRestuAuther={isRestuAuther}
                isResLoading={isResLoading}
              />
            }
          />
        </Route>

        {/* ================= Restaurant Routes ==================*/}

        <Route path="/food" element={<Food isAuther={isAuther} isLoading={isLoading} />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </Router>
  );
}

export default App;
