import {createHashRouter} from "react-router-dom";
import BasicLayout from "src/pages/BasicLayout";
import About from "@/pages/About";
import AuthRoute from "@/components/AuthRoute";
import {AUTH_ADMIN, AUTH_USER} from "@/utils";
import NotAuth from "@/components/NotAuth";
import UserLayout from "@/pages/UserLayout";
import Login from "@/pages/Login";
import QuestionManager from "@/pages/QuestionManager";
import AddQuestion from "@/pages/AddQuestion";
import EditQuestion from "@/pages/EditQuestion";
import QuestionBrowser from "@/pages/QuestionBrowser";
import QuestionSubmit from "@/pages/QuestionSubmit";

const router = createHashRouter([
    {
        path: '/',
        element: <AuthRoute auth={AUTH_USER}><BasicLayout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <QuestionBrowser />,
                meta: {
                    hidden: true,
                    lightPath: 'questions'
                }
            },
            {
                path: 'questions',
                name: '浏览题目',
                element: <QuestionBrowser />
            },
            {
                path: 'questions/:id',
                element: <QuestionSubmit />,
                meta: {
                    hidden: true
                }
            },
            {
                path: 'about',
                name: '关于我的',
                element: <About />
            },
            {
                path: 'questionManager',
                name: '管理题目',
                element: <AuthRoute auth={AUTH_ADMIN}><QuestionManager /></AuthRoute>,
                meta: {
                    auth: AUTH_ADMIN,
                }
            },
            {
                path: 'questionManager/add',
                element: <AuthRoute auth={AUTH_ADMIN}><AddQuestion /></AuthRoute>,
                meta: {
                    hidden: true,
                }
            },
            {
                path: 'questionManager/edit',
                element: <AuthRoute auth={AUTH_ADMIN}><EditQuestion /></AuthRoute>,
                meta: {
                    hidden: true
                }
            }
        ]
    },
    {
        path: '/user',
        element: <UserLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '/403',
        element: <NotAuth />
    }
])

export default router