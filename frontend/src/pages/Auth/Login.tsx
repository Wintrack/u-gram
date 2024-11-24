import { Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { Storage } from "../../services/storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Signin() {
    const [data, setData] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-EF10RV2L0Z";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regexEemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regexEemail.test(data.email)) {
            toast.warning("Invalid email adress");
            return;
        }

        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/auth/login",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (
                response.status === 204 ||
                response.status === 201 ||
                response.status === 200
            ) {
                console.log(response.data.access_token);
                await Storage.setToken(response.data.access_token);
                window.location.href = "/dash/search";
            } else {
                toast.error("Failed to login");
            }
        } catch (error) {
            toast.error("Failed to login");
        }
    };

    const responseMessage = async (message: any) => {
        console.log(message);

        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL +
                    "/auth/oauth-google" +
                    message.credential,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="bg-neutral-200 dark:bg-neutral-700 overflow-hidden h-screen flex">
            <div className="h-screen w-full md:w-1/2 flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-3/4 flex flex-col gap-4"
                >
                    <Typography placeholder="" color="red" variant="h2">
                        Welcome back !
                    </Typography>
                    <Input
                        className="text-white"
                        onChange={handleChange}
                        value={data.email}
                        name="email"
                        crossOrigin=""
                        label="Email adress"
                        color="red"
                        required
                    />
                    <Input
                        className="text-white"
                        onChange={handleChange}
                        value={data.password}
                        name="password"
                        crossOrigin=""
                        label="Password"
                        color="red"
                        type="password"
                        required
                    />
                    <button
                        type="submit"
                        className="btn px-4 py-2 rounded-md text-white hover:opacity-80 transition-all"
                        style={{
                            background:
                                "linear-gradient(to top right, #ff7a00, #ff0069, #7638fa)",
                        }}
                    >
                        Login
                    </button>
                    <GoogleLogin
                        onSuccess={responseMessage}
                        locale="en"
                    ></GoogleLogin>
                    <Link
                        to="/register"
                        className="text-center text-red-500 hover:underline"
                    >
                        No account yet ? Register
                    </Link>
                </form>
            </div>
            <div
                className="hidden md:flex h-screen w-1/2 flex justify-center items-center"
                style={{
                    background:
                        "linear-gradient(to top right, #ff7a00, #ff0069, #7638fa)",
                }}
            ></div>
        </section>
    );
}
