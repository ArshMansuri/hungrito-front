import "./App.css";
import { useEffect, lazy , Suspense} from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userLoad } from "./redux/actions/user";
import { resLoad } from "./redux/actions/restaurant";
import Loader from "./Components/Loaders/Loader";

const Home = lazy(()=> import('./Pages/USER/Home/Home'))
const Login = lazy(()=> import('./Pages/USER/Login/Login'))
const SignUp = lazy(()=> import('./Pages/USER/SignUp/SignUp'))
const ResLogin = lazy(()=> import('./Pages/RESTAURANT/ResLogin/ResLogin'))
const ResSignUp = lazy(()=> import('./Pages/RESTAURANT/ResSignUp/ResSignUp1/ResSignUp'))
const ResSignUp2 = lazy(()=> import('./Pages/RESTAURANT/ResSignUp/ResSignUp2/ResSignUp2'))
const ResSignUp3 = lazy(()=> import('./Pages/RESTAURANT/ResSignUp/ResSignUp3/ResSignUp3'))
const ResFirstVerify = lazy(()=> import('./Pages/RESTAURANT/ResSignUp/ResFirstVerify/ResFirstVerify'))
const AuthProtected = lazy(()=> import('./Components/ProtectedRoute/AuthProtected'))
const Food = lazy(()=> import('./Pages/USER/Food/Food'))
const AuthResProtected = lazy(()=> import('./Components/ProtectedRoute/AuthResProtected'))
const ResDashboard = lazy(()=> import('./Pages/RESTAURANT/Dashboard/ResDashboard'))
const ResOnly = lazy(()=> import('./Components/ProtectedRoute/ResOnly'))
const OrderList = lazy(()=> import('./Pages/RESTAURANT/OrderList/OrderList'))
const FoodList = lazy(()=> import('./Pages/RESTAURANT/FoodList/FoodList'))
const CreateFood = lazy(()=> import('./Pages/RESTAURANT/CreateFood/CreateFood'))
const UpdateFood = lazy(()=> import('./Pages/RESTAURANT/UpdateFood/UpdateFood'))
const Temp = lazy(()=> import('./temp/Temp'))


function App() {
  const dispatch = useDispatch();

  const { isAuther, isLoading } = useSelector((state) => state.user);
  const isRestuAuther = useSelector((state) => state.restu?.isRestuAuther);
  const {isLoading:isResLoading} = useSelector((state) => state.restu);
  
  useEffect(() => {
    if (localStorage.getItem("isUser") === "true") {
      dispatch(userLoad());
    }
    if (localStorage.getItem("isRestu") === "true") {
      dispatch(resLoad());
    }
  }, [dispatch]);

  // console.log(isRestuAuther);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
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

        {/* ================= Restaurant Routes ==================*/}
        <Route
          element={
            <ResOnly
              isRestuAuther={isRestuAuther}
              isResLoading={isResLoading}
            />
          }
        >
          <Route
            path="/res/dashboard"
            element={<ResDashboard isRestuAuther={isRestuAuther} isResLoading={isResLoading} />}
          />
          <Route
            path="/res/order/list"
            element={<OrderList isRestuAuther={isRestuAuther} isResLoading={isResLoading} />}
          />
          <Route
            path="/res/food/list"
            element={<FoodList isRestuAuther={isRestuAuther} isResLoading={isResLoading} />}
          />
          <Route
            path="/res/food/create"
            element={<CreateFood isRestuAuther={isRestuAuther} isResLoading={isResLoading} />}
          />
          <Route
            path="/res/food/manage/:id"
            element={<UpdateFood isRestuAuther={isRestuAuther} isResLoading={isResLoading} />}
          />
          <Route path="/temp" element={<Temp />} />
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

        <Route
          path="/food"
          element={<Food isAuther={isAuther} isLoading={isLoading} />}
        />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
