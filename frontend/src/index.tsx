import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { Storage } from "./services/storage";
import { RouteData, routes } from "./services/routes";

import "./assets/css/index.css";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

library.add(fas);

const token = Storage.getToken();

function renderRoutes(routes: RouteData[]) {
    return routes.map((route) => {
        let element = null;
        if (route.auth && !token) {
            element = <Navigate to="/" />;
        } else if (route.auth && token) {
            element = route.element;
        } else if (!route.auth) {
            element = route.element;
        }

        return <Route key={route.path} path={route.path} element={element} children={route.routes ? renderRoutes(route.routes || []) : null} />;
    });
}

const tokenGoogle = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <GoogleOAuthProvider clientId={tokenGoogle}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    {routes.map((routeGroup, index) => (
                        <Route key={index} path={routeGroup.baseUrl ?? "/"} element={routeGroup.element ?? null} children={renderRoutes(routeGroup.pages)} />
                    ))}
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
