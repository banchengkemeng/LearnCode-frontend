import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '@arco-design/web-react/dist/css/arco.css';
import router from "./router";
import store from "./store";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import "@/extends/ResolveResizeObserverError"

const root = ReactDOM.createRoot(document.getElementById('root'));

(() => {
    // 全局项目入口
    console.log("欢迎来到OJI!!!")
})()

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);