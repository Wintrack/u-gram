import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register";
import Dash from "../pages/Dash/Dash";

import ListPicture from "../pages/Dash/ListPicture/ListPicture";
import ListUser from "../pages/Dash/ListUser/ListUser";
import Picture from "../pages/Dash/Picture/Picture";
import Profil from "../pages/Dash/Profil/Profil";
import Upload from "../pages/Dash/Upload/Upload";
import Notifications from "../pages/Dash/Notifications/Notifications";
import ProfilEdit from "../pages/Dash/Profil/Edit";
import Page404 from "../pages/Bundle/Page404";

interface RouteDisplay {
    icon?: React.JSX.Element;
    name: string;
}

export interface RouteData {
    path: string;
    auth: boolean;
    display?: RouteDisplay;
    element?: React.JSX.Element;
    routes?: RouteData[];
}

export interface RouteGroup {
    baseUrl?: string;
    title?: string;
    shownInSidebar?: boolean;
    element?: React.JSX.Element;
    pages: RouteData[];
}

export const routes: RouteGroup[] = [
    {
        shownInSidebar: false,
        pages: [
            {
                path: "/",
                auth: false,
                element: <Login />
            },
            {
                path: "/register",
                auth: false,
                element: <Register />
            },
            {
                path: "/dash",
                auth: false, // true
                element: <Dash />
            }
        ],
    },
    {
        baseUrl: "dash",
        element: <Dash />,
        shownInSidebar: false,
        pages: [
            {
                path: "picture/:id",
                auth: false, // true
                element: <Picture />
            },
            {
                path: "edit",
                auth: false, // true
                element: <ProfilEdit />
            }
        ]
    },
    {
        baseUrl: "dash",
        element: <Dash />,
        shownInSidebar: true,
        pages: [
            {
                display: {
                    icon: <FontAwesomeIcon icon="magnifying-glass" className="w-5 h-5 text-inherit" />,
                    name: "Search",
                },
                auth: false, // true
                path: "search",
                element: <ListUser />,
            },
            {
                display: {
                    icon: <FontAwesomeIcon icon="compass" className="w-5 h-5 text-inherit" />,
                    name: "Explore",
                },
                auth: false, // true
                path: "discover",
                element: <ListPicture />,
            },
            {
                display: {
                    icon: <FontAwesomeIcon icon="heart" className="w-5 h-5 text-inherit" />,
                    name: "Notifications",
                },
                auth: false, // true
                path: "notifications",
                element: <Notifications />,
            },
            {
                display: {
                    icon: <FontAwesomeIcon icon="plus" className="w-5 h-5 text-inherit" />,
                    name: "Create",
                },
                auth: false, // true
                path: "add",
                element: <Upload />,
            },
            {
                display: {
                    icon: <FontAwesomeIcon icon="user" className="w-5 h-5 text-inherit" />,
                    name: "Profile",
                },
                auth: false, // true
                path: "profil/:id",
                element: <Profil />,
            },
        ],
    },
    {
        baseUrl: "dash",
        element: <Dash />,
        shownInSidebar: false,
        pages: [
            {
                path: "*",
                auth: false,
                element: <Page404 />
            },
        ]
    },
    {
        shownInSidebar: false,
        pages: [
            {
                path: "/*",
                auth: false,
                element: <Page404 />
            }
        ],
    },
];

export function getAllowedRoutes(): RouteGroup[] {
    return routes.map((routeGroup) => ({
        ...routeGroup,
        pages: routeGroup.pages.filter((route) =>
            route.auth ? true : true
        ),
    }));
}