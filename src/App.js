import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userLoad } from "./redux/actions/user";
import { resLoad } from "./redux/actions/restaurant";
import Loader from "./Components/Loaders/Loader";
import axios from "axios";
import AuthDelBoyProtected from "./Components/ProtectedRoute/DelBoyProtected/AuthDelBoyProtected";
import { dbLoad } from "./redux/actions/delBoy";

const Home = lazy(() => import("./Pages/USER/Home/Home"));
const UserRes = lazy(() => import("./Pages/USER/UserRes/UserRes"));
const Login = lazy(() => import("./Pages/USER/Login/Login"));
const SignUp = lazy(() => import("./Pages/USER/SignUp/SignUp"));
const ResLogin = lazy(() => import("./Pages/RESTAURANT/ResLogin/ResLogin"));
const ResSignUp = lazy(() =>
  import("./Pages/RESTAURANT/ResSignUp/ResSignUp1/ResSignUp")
);
const ResSignUp2 = lazy(() =>
  import("./Pages/RESTAURANT/ResSignUp/ResSignUp2/ResSignUp2")
);
const ResSignUp3 = lazy(() =>
  import("./Pages/RESTAURANT/ResSignUp/ResSignUp3/ResSignUp3")
);
const ResFirstVerify = lazy(() =>
  import("./Pages/RESTAURANT/ResSignUp/ResFirstVerify/ResFirstVerify")
);
const AuthProtected = lazy(() =>
  import("./Components/ProtectedRoute/AuthProtected")
);
const Food = lazy(() => import("./Pages/USER/Food/Food"));
const AuthResProtected = lazy(() =>
  import("./Components/ProtectedRoute/AuthResProtected")
);
const ResDashboard = lazy(() =>
  import("./Pages/RESTAURANT/Dashboard/ResDashboard")
);
const ResOnly = lazy(() => import("./Components/ProtectedRoute/ResOnly"));
const OrderList = lazy(() => import("./Pages/RESTAURANT/OrderList/OrderList"));
const FoodList = lazy(() => import("./Pages/RESTAURANT/FoodList/FoodList"));
const CreateFood = lazy(() =>
  import("./Pages/RESTAURANT/CreateFood/CreateFood")
);
const UpdateFood = lazy(() =>
  import("./Pages/RESTAURANT/UpdateFood/UpdateFood")
);
const MyCart = lazy(() => import("./Pages/USER/MyCart/MyCart"));
const UsreOnly = lazy(() => import("./Components/ProtectedRoute/UsreOnly"));
const Checkout = lazy(() => import("./Pages/USER/Checkout/Checkout"));
const DbFirstVerify = lazy(() =>
  import("./Pages/DeliveryBoy/DbSignUp/DbFirstVerify/DbFirstVerify")
);
const DbSignUp = lazy(() =>
  import("./Pages/DeliveryBoy/DbSignUp/DbSignUp1/DbSignUp")
);
const DbSignUp2 = lazy(() =>
  import("./Pages/DeliveryBoy/DbSignUp/DbSignUp2/DbSignUp2")
);
const DbLogin = lazy(() => import("./Pages/DeliveryBoy/DbLogin/DbLogin"));
const Temp = lazy(() => import("./temp/Temp"));

function App() {
  const dispatch = useDispatch();

  const { isAuther, isLoading } = useSelector((state) => state.user);
  const isRestuAuther = useSelector((state) => state.restu?.isRestuAuther);
  const { isLoading: isResLoading } = useSelector((state) => state.restu);
  const isDbAuther = useSelector((state) => state.delBoy?.isDbAuther);
  const { isLoading: isDbLoading } = useSelector((state) => state.delBoy);

  const MAP_API = process.env.REACT_APP_TOM_TOM_API_KEY;

  useEffect(() => {
    if (localStorage.getItem("isUser") === "true") {
      dispatch(userLoad());
    }
    if (localStorage.getItem("isRestu") === "true") {
      dispatch(resLoad());
    }
    if (localStorage.getItem("isDelBoy") === "true") {
      dispatch(dbLoad());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("city")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (p) => {
            const { latitude, longitude } = p?.coords;
            try {
              const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${MAP_API}`;
              const res = await axios.get(apiUrl);
              const data = res.data;
              if (data && data.addresses && data.addresses.length > 0) {
                const address = data.addresses[0].address;
                const city = {
                  address: address?.freeformAddress || "",
                  subText:
                    address?.countrySubdivisionName + " " + address?.country,
                  lat: latitude,
                  lan: longitude,
                };
                localStorage.setItem("city", JSON.stringify(city));
              } else {
                console.error("No address information found.");
              }
            } catch (error) {
              console.log(error);
              console.error(
                "Error fetching data from TomTom API:",
                error.message
              );
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    }
  }, [MAP_API]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ================= User Without Auth Routes ==================*/}
          <Route
            path="/"
            element={<Home isAuther={isAuther} isLoading={isLoading} />}
          />
          <Route
            path="/user/res/:resId"
            element={<UserRes isAuther={isAuther} isLoading={isLoading} />}
          />

          <Route
            element={<UsreOnly isAuther={isAuther} isLoading={isLoading} />}
          >
            <Route
              path="/my/cart"
              element={<MyCart isAuther={isAuther} isLoading={isLoading} />}
            />
            <Route
              path="/user/checkout"
              element={<Checkout isAuther={isAuther} isLoading={isLoading} />}
            />
          </Route>

          {/* ================= User Auth Routes ==================*/}
          <Route
            element={
              <AuthProtected isAuther={isAuther} isLoading={isLoading} />
            }
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
              element={
                <ResDashboard
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
            />
            <Route
              path="/res/order/list"
              element={
                <OrderList
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
            />
            <Route
              path="/res/food/list"
              element={
                <FoodList
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
            />
            <Route
              path="/res/food/create"
              element={
                <CreateFood
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
            />
            <Route
              path="/res/food/manage/:id"
              element={
                <UpdateFood
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
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
              path="/db/verify"
              element={
                <DbFirstVerify
                  isDbAuther={isDbAuther}
                  isDbLoading={isDbLoading}
                />
              }
            />
          <Route
            element={
              <AuthDelBoyProtected
                isDbAuther={isDbAuther}
                isDbLoading={isDbLoading}
              />
            }
          >
            <Route
              path="/db/signup/:email"
              element={
                <DbSignUp isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
              }
            />
            <Route
              path="/db/signup/p2/:email"
              element={
                <DbSignUp2 isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
              }
            />
            <Route
              path="/db/login"
              element={
                <DbLogin isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
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
