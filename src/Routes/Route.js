import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller/AllSeller";
import DashBoard from "../Pages/Dashboard/Dashboard/DashBoard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ReportedItem from "../Pages/Dashboard/ReportedItem/ReportedItem";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryProducts /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://resale-phone-garage.vercel.app/category/${params.id}`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/blog',
                element: <Blog />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout /> </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            // {
            //     path: '/dashboard',
            //     element: <DashBoard />
            // },
            {
                path: '/dashboard',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/products',
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders /></BuyerRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSeller /></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyer /></AdminRoute>
            },
            {
                path: '/dashboard/reportedItems',
                element: <AdminRoute><ReportedItem /></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoute><Payment /></BuyerRoute>,
                loader: ({ params }) => fetch(`https://resale-phone-garage.vercel.app/orders/${params.id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            }

        ]
    }

]);