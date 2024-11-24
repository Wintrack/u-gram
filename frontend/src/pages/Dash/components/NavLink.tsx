import { Button, Typography } from "@material-tailwind/react";
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
    layout?: string;
    path: string;
    handleOpen: () => void;
    icon: ReactNode;
    name: string;
    whoAmI: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ layout, path, handleOpen, icon, name, whoAmI }) => {
    const toWhereIGo = () => {
        if (path === "/profil/:id") {
            return `/${layout}/profil/${whoAmI}`;
        } else {
            return `/${layout}${path}`;
        }
    }

    return (
        <NavLink
            to={toWhereIGo()}
            onClick={() => {
                handleOpen();
            }}
        >
            {({ isActive }) => {
                return (
                    <Button
                        placeholder=""
                        variant={isActive ? "gradient" : "text"}
                        color={isActive ? "deep-purple" : "white"}
                        className="flex items-center gap-6 px-4 capitalize"
                        fullWidth
                    >
                        {icon}
                        <Typography placeholder="" color="inherit" className="font-medium capitalize">
                            {name}
                        </Typography>
                    </Button>
                );
            }}
        </NavLink>
    );
};

export default NavLinks;
