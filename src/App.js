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
import socketIO from "socket.io-client";
import AuthAdminProtected from "./Components/ProtectedRoute/AdminProtected/AuthAdminProtected";
import AdminOnly from "./Components/ProtectedRoute/AdminProtected/AdminOnly";
import { adminLoad } from "./redux/actions/admin";

const Home = lazy(() => import("./Pages/USER/Home/Home"));
const Search = lazy(() => import("./Pages/USER/Search/Search"));
const UserRes = lazy(() => import("./Pages/USER/UserRes/UserRes"));
const UserProfile = lazy(() => import("./Pages/USER/UserProfile/UserProfile"));
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
const ResProfile = lazy(() =>
  import("./Pages/RESTAURANT/ResProfile/ResProfile")
);
const ResOnly = lazy(() => import("./Components/ProtectedRoute/ResOnly"));
const OrderList = lazy(() => import("./Pages/RESTAURANT/OrderList/OrderList"));
const NewOrder = lazy(() => import("./Pages/RESTAURANT/NewOrder/NewOrder"));
const FoodList = lazy(() => import("./Pages/RESTAURANT/FoodList/FoodList"));
const CreateFood = lazy(() =>
  import("./Pages/RESTAURANT/CreateFood/CreateFood")
);
const UpdateFood = lazy(() =>
  import("./Pages/RESTAURANT/UpdateFood/UpdateFood")
);
const MyCart = lazy(() => import("./Pages/USER/MyCart/MyCart"));
const MySaveFood = lazy(() => import("./Pages/USER/MySaveFood/MySaveFood"));
const UsreOnly = lazy(() => import("./Components/ProtectedRoute/UsreOnly"));
const Checkout = lazy(() => import("./Pages/USER/Checkout/Checkout"));
const DelBoyOnly = lazy(() =>
  import("./Components/ProtectedRoute/DelBoyProtected/DelBoyOnly")
);
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
const DbHome = lazy(() => import("./Pages/DeliveryBoy/DbHome/DbHome"));
const DbOrder = lazy(() => import("./Pages/DeliveryBoy/DbOrder/DbOrder"));
const DbProfile = lazy(() => import("./Pages/DeliveryBoy/DbProfile/DbProfile"));
const ResWallet = lazy(() => import("./Pages/RESTAURANT/ResWallet/ResWallet"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin/AdminLogin"));
const AdminDashBoard = lazy(() => import("./Pages/Admin/AdminDashBoard/AdminDashBoard"));
const AdminResList = lazy(() => import("./Pages/Admin/AdminResList/AdminResList"));
const AdminDbList = lazy(() => import("./Pages/Admin/AdminDbList/AdminDbList"));
const AdminNewResList = lazy(() => import("./Pages/Admin/AdminNewResList/AdminNewResList"));
const AdminNewDbList = lazy(() => import("./Pages/Admin/AdminNewDbList/AdminNewDbList"));
const AdminDbVerify = lazy(() => import("./Pages/Admin/AdminDbVerify/AdminDbVerify"));
const AdminResManage = lazy(() => import("./Pages/Admin/AdminResManage/AdminResManage"));
const AdminResVerify = lazy(() => import("./Pages/Admin/AdminResVerify/AdminResVerify"));
const AdminDbManage = lazy(() => import("./Pages/Admin/AdminDbManage/AdminDbManage"));
const AdminProfile = lazy(() => import("./Pages/Admin/AdminProfile/AdminProfile"));
const AdminUserList = lazy(() => import("./Pages/Admin/AdminUserList/AdminUserList"));
const AdminReturnOrderPayment = lazy(() => import("./Pages/Admin/AdminReturnOrderPayment/AdminReturnOrderPayment"));
const SendNotification = lazy(() => import("./Pages/Admin/SendNotification/SendNotification"));
const Temp = lazy(() => import("./temp/Temp"));

const socket = socketIO(process.env.REACT_APP_BASE_URL, {
  transports: ["websocket"],
});

function App() {
  const dispatch = useDispatch();

  const { isAuther, isLoading, user } = useSelector((state) => state.user);
  const isRestuAuther = useSelector((state) => state.restu?.isRestuAuther);
  const { isLoading: isResLoading, restu } = useSelector(
    (state) => state.restu
  );
  const isDbAuther = useSelector((state) => state.delBoy?.isDbAuther);
  const { isLoading: isDbLoading, delBoy } = useSelector(
    (state) => state.delBoy
  );
  const isAdminAuther = useSelector((state) => state.admin?.isAdminAuther);
  const { isLoading: isAdminLoading } = useSelector((state) => state.admin);

  const MAP_API = process.env.REACT_APP_TOM_TOM_API_KEY;

  useEffect(() => {
    if (localStorage.getItem("isUser") === "true") {
      dispatch(userLoad());
    } else if (localStorage.getItem("isRestu") === "true") {
      dispatch(resLoad());
    } else if (localStorage.getItem("isDelBoy") === "true") {
      dispatch(dbLoad());
    } else if (localStorage.getItem("isAdmin") === "true") {
      dispatch(adminLoad());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("user");
      socket.emit("user-online", { userId: user?._id });
    } else if (isDbAuther && delBoy?._id !== undefined) {
      console.log("del");
      socket.emit("deliveryBoy-online", { dbId: delBoy?._id });
    } else if (isRestuAuther && restu?._id !== undefined) {
      console.log("res");
      socket.emit("restaurant-online", { resId: restu?._id });
    }
  }, [user, isDbAuther, isRestuAuther]);

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
            element={
              <Home isAuther={isAuther} isLoading={isLoading} socket={socket} />
            }
          />

          <Route
            path="/user/res/:resId"
            element={<UserRes isAuther={isAuther} isLoading={isLoading} />}
          />

          <Route
            path="/search"
            element={<Search isAuther={isAuther} isLoading={isLoading} />}
          />

          <Route
            element={<UsreOnly isAuther={isAuther} isLoading={isLoading} />}
          >
            <Route
              path="/save"
              element={<MySaveFood isAuther={isAuther} isLoading={isLoading} />}
            />
            <Route
              path="/my/cart"
              element={
                <MyCart
                  isAuther={isAuther}
                  isLoading={isLoading}
                  socket={socket}
                />
              }
            />
            <Route
              path="/user/checkout"
              element={<Checkout isAuther={isAuther} isLoading={isLoading} />}
            />
            <Route
              path="/user/profile"
              element={
                <UserProfile
                  isAuther={isAuther}
                  isLoading={isLoading}
                  socket={socket}
                />
              }
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
              path="/res/neworder"
              element={
                <NewOrder
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                  socket={socket}
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
            <Route
              path="/res/profile"
              element={
                <ResProfile
                  isRestuAuther={isRestuAuther}
                  isResLoading={isResLoading}
                />
              }
            />
            <Route
              path="/res/wallet"
              element={
                <ResWallet
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
            element={
              <DelBoyOnly
                isDbAuther={isDbAuther}
                isDbLoading={isDbLoading}
                socket={socket}
              />
            }
          >
            <Route
              path="/db/dashboard"
              element={
                <DbHome isDbAuther={isDbAuther} isDbLoading={isDbLoading} />
              }
            />
            <Route
              path="/db/order"
              element={
                <DbOrder
                  isDbAuther={isDbAuther}
                  isDbLoading={isDbLoading}
                  socket={socket}
                />
              }
            />
            <Route
              path="/db/profile"
              element={
                <DbProfile
                  isDbAuther={isDbAuther}
                  isDbLoading={isDbLoading}
                  socket={socket}
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

          <Route
            element={
              <AdminOnly
                isAdminAuther={isAdminAuther}
                isAdminLoading={isAdminLoading}
              />
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashBoard isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/res/list" element={<AdminResList isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/db/list" element={<AdminDbList isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/new/res/list" element={<AdminNewResList isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/res/verify/:resId" element={<AdminResVerify isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/new/db/list" element={<AdminNewDbList isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/db/verify/:dbId" element={<AdminDbVerify isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/res/manage/:resId" element={<AdminResManage isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/db/manage/:dbId" element={<AdminDbManage isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/profile" element={<AdminProfile isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/user/list" element={<AdminUserList isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/return/payment/list" element={<AdminReturnOrderPayment isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
            <Route path="/admin/send/notification" element={<SendNotification isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
          </Route>
          <Route
            element={
              <AuthAdminProtected
                isAdminAuther={isAdminAuther}
                isAdminLoading={isAdminLoading}
              />
            }
          >
            <Route path="/admin/login" element={<AdminLogin isAdminAuther={isAdminAuther}  isAdminLoading={isAdminLoading} />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
