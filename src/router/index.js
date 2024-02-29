import {createHashRouter} from "react-router-dom";
import BasicLayout from "@/pages/Layout";
import Problems from "@/pages/Problems";
import About from "@/pages/About";
import AuthRoute from "@/components/AuthRoute";
import {AUTH_USER} from "@/utils";
import NotAuth from "@/components/NotAuth";

const router = createHashRouter([
    {
        path: '/',
        element: <AuthRoute auth={AUTH_USER}><BasicLayout /></AuthRoute>,
        children: [
            {
                path: 'problems',
                name: '浏览题目',
                element: <Problems />
            },
            {
                path: 'about',
                name: '关于我的',
                element: <About />
            }
        ]
    },
    {
        path: '/403',
        element: <NotAuth />
    }
])

export default router