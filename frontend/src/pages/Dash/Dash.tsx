import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./components/Navbar";

export default function Dash() {
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-EF10RV2L0Z";
      script.async = true;
      document.head.appendChild(script);

      return () => {
          document.head.removeChild(script);
      };
    }, []);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="h-screen overflow-x-hidden">
            <div className="p-4 xl:ml-80">
                <Aside open={open} handleOpen={handleOpen} />
                <Outlet />
            </div>
        </div>
    );
}