import { Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
    const navigate = useNavigate()
    const [tmpPicture, setTmpPicture] = useState<any>();
    const [data, setData] = useState<{
        email: string,
        password: string,
        pseudo: string,
        firstname: string,
        lastname: string,
        phoneNumber: string
    }>({
        email: "",
        password: "",
        pseudo: "",
        firstname: "",
        lastname: "",
        phoneNumber: ""
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
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!regexEmail.test(data.email)) {
            toast.warning("Invalid email adress")
            return
        }

        if (data.phoneNumber !== "" ) {
            const regexPhonePlus33 = /^(\+33|0)[1-9](\d{2}){4}$/
            if (!regexPhonePlus33.test(data.phoneNumber)) {
                toast.warning("Invalid phone number")
                return
            }
        }

        const form = new FormData()
        form.append("picture", tmpPicture)
        try {
            const responsePicture = await axios.post(process.env.REACT_APP_BACKEND_URL + "/picture/upload", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            })

            if (responsePicture.status === 201 ) {
                const datas = {
                    email: data.email,
                    password: data.password,
                    pseudo: data.pseudo,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phoneNumber: data.phoneNumber,
                    profilPictureId: responsePicture.data.id
                }

                try {
                    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/user/register", datas, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })

                    if (response.status === 204 || response.status === 201 || response.status === 200) {
                        toast.success("Successful registration")
                        navigate("/")
                    } else {
                        toast.error("Registration failed")
                    }
                } catch (error: any) {
                    toast.error(`Registration failed : ${error.response?.data.message}`)
                }
            }
        } catch (error) {
            toast.error("Registration failed")
        }
    }
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        setTmpPicture(selectedFile);
    };


    return (
        <section className="bg-neutral-200 dark:bg-neutral-700 overflow-hidden h-screen flex">
            <div className="hidden md:flex h-screen w-1/2 flex justify-center items-center" style={{background: "linear-gradient(to top right, #ff7a00, #ff0069, #7638fa)"}}>    
            </div>
            <div className="h-screen w-full md:w-1/2 flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-4">
                    <Typography placeholder="" color="red" variant="h2">Sign up !</Typography>
                    <Input className="text-white" onChange={handleChange} value={data.email} name="email" crossOrigin="" label="Email adress" color="red" type="email" required />
                    <Input className="text-white" onChange={handleChange} value={data.pseudo} name="pseudo" crossOrigin="" label="Nickname" color="red" required />
                    <Input className="text-white" onChange={handleChange} value={data.firstname} name="firstname" crossOrigin="" label="First name" color="red" required />
                    <Input className="text-white" onChange={handleChange} value={data.lastname} name="lastname" crossOrigin="" label="Last name" color="red" required />
                    <Input className="text-white" onChange={handleChange} value={data.phoneNumber} name="phoneNumber" crossOrigin="" label="Phone number" type="tel" color="red" required />
                    <Input className="text-white" onChange={handleChange} value={data.password} name="password" crossOrigin="" label="Password" type="password" color="red" required />
                    <Input className="text-white" onChange={handleFileChange} name="profilPicture" crossOrigin="" label="Profile picture" type="file" color="red" required />
                    <button type="submit" className="btn px-4 py-2 rounded-md text-white hover:opacity-80 transition-all" style={{background: "linear-gradient(to top right, #ff7a00, #ff0069, #7638fa)"}}>Register</button>
                    <Link to="/" className="text-center text-red-500 hover:underline">Already registred ? Login</Link>
                </form>
            </div>
        </section>
    );
}
