import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Storage } from "../../../services/storage";
import moment from "moment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalProfilePicture from "./ModalProfilePicture";

export default function ProfilEdit() {
    const [open, setOpen] = useState(false);
    const [me, setMe] = useState({
        id: "",
        pseudo: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        createdAt: "",
        authId: "",
        profilPictureId: "",
        auth: {
            id: "",
            email: ""
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMe = await axios.get(process.env.REACT_APP_BACKEND_URL + `/user/me`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (responseMe.status === 200) {
                    setMe(responseMe.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const datas = {
            firstname: me.firstname,
            lastname: me.lastname,
            phoneNumber: me.phoneNumber,
            email: me.auth.email,
        }

        try {
            const response = await axios.put(process.env.REACT_APP_BACKEND_URL + `/user`, datas, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200) {
                toast.success("Profil updated");
                setMe({
                    ...me,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    phoneNumber: response.data.phoneNumber,
                    auth: {
                        ...me.auth,
                        email: response.data.email
                    }

                })
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("Error");
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/user`, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200 || response.status === 204) {
                toast.success("Profil deleted");
                Storage.emptyStorage();
                window.location.href = "/";
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("Error");
        }
    }


    return (
        <>
            <ModalProfilePicture open={open} setOpen={setOpen} />
            <div className="text-white max-w-[935px] pt-[30px]">
                <div className="flex justify-between w-full">
                    <div className="flex grow justify-center items-center relative">
                        <button onClick={() => setOpen(!open)} className="absolute bg-black bg-opacity-50 w-full h-full rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon="camera" className="text-white text-[50px]" />
                        </button>
                        <img src={process.env.REACT_APP_BACKEND_URL + `/picture/download/${me.profilPictureId}`} alt={me.pseudo} className="h-[150px] w-[150px] rounded-full" />
                    </div>
                    <div className="flex grow-[2] flex-col justify-center gap-3">
                        <div className="flex gap-4 items-center">
                            <span className="text-[20px] font-normal">{me.pseudo}</span>
                            <a href={`/dash/profil/${me.id}`}>
                                <Button placeholder="" color="purple" size="sm" type="button" onClick={() => {}}>
                                    Cancel
                                </Button>
                            </a>
                        </div>
                        {/* <div className="flex gap-4 items-center">
                            <Chip color="pink" size="sm" value={`${images.length} pictures`} />
                            <Chip color="yellow" size="sm" value={`${images.length} followers`} />
                        </div> */}
                        <div className="flex flex-col">
                            <span className="text-[14px] font-normal">{me.firstname} {me.lastname}</span>
                            <span className="text-[14px] font-normal">{moment(me.createdAt).format("DD.MM.YYYY")}</span>
                            <span className="text-[14px] font-normal">{me.phoneNumber}</span>
                            <span className="text-[14px] font-normal">{me.auth.email}</span>
                        </div>
                    </div>
                </div>
                <hr className="border-[#262626] my-[30px]" />
                <div className="grid grid-cols-2 gap-4">
                    <Input crossOrigin="" className="text-white" color="purple" type="text" label="Last name" value={me.firstname} onChange={(e) => setMe({ ...me, firstname: e.target.value })} />
                    <Input crossOrigin="" className="text-white" color="purple" type="text" label="First name" value={me.lastname} onChange={(e) => setMe({ ...me, lastname: e.target.value })} />
                    <Input crossOrigin="" className="text-white" color="purple" type="text" label="Phone number" value={me.phoneNumber} onChange={(e) => setMe({ ...me, phoneNumber: e.target.value })} />
                    <Input crossOrigin="" className="text-white" color="purple" type="text" label="Email adress" value={me.auth.email} onChange={(e) => setMe({ ...me, auth: {...me.auth, email : e.target.value } })} />
                    <Button placeholder="" color="purple" size="sm" type="button" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                    <Button placeholder="" color="red" size="sm" type="button" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}
