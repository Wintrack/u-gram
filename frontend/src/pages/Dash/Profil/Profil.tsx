import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Storage } from "../../../services/storage";
import moment from "moment";
import { toast } from "react-toastify";

export default function Profil() {
    const { id } = useParams();
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
    const [dataUser, setDataUser] = useState<{
        id: string
        pseudo: string
        firstname: string
        lastname: string
        phoneNumber: string
        createdAt: string
        authId: string
        profilPictureId: string,
        _count: {
            pictures: number
        }
    }>({
        id: "",
        pseudo: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        createdAt: "",
        authId: "",
        profilPictureId: "",
        _count: {
            pictures: 0
        }
    });
    const [picturesUser, setPicturesUser] = useState<{
        id: string,
        description: string,
        keyWords: string[],
        autorId: string,
        fileId: string,
        createdAt: string,
        mentions: []
    }[]>([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const limit = 9;
    const navigate = useNavigate();

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

            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (response.status === 200) {
                    setDataUser(response.data);
                }
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    navigate('/dash/user-not-found');
                }
            }
        }
        fetchData();
        setPage(0);
    }, [id, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePictures = await axios.get(process.env.REACT_APP_BACKEND_URL + `/picture?userId=${id}&orderByCreation=true&page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (responsePictures.status === 200) {
                    (page > 0) ? setPicturesUser((prevPictures) => prevPictures.concat(responsePictures.data)) : setPicturesUser(responsePictures.data);
                    setMore(responsePictures.data?.length === limit)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id, page]);

    const deleteThisPicture = async (id: string) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/picture/${id}`, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200) {
                setPicturesUser(picturesUser.filter((picture) => picture.id !== id));
                toast.success("Picture deleted");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error");
        }
    }

    return (
        <div className="text-white max-w-[935px] pt-[30px]">
            <div className="flex justify-between w-full">
                <div className="flex grow flex justify-center items-center">
                    <img src={process.env.REACT_APP_BACKEND_URL + `/picture/download/${dataUser.profilPictureId}`} alt={dataUser.pseudo} className="h-[150px] w-[150px] rounded-full" />
                </div>
                <div className="flex grow-[2] flex-col justify-center gap-3">
                    <div className="flex gap-4 items-center">
                        <span className="text-[20px] font-normal">{dataUser.pseudo}</span>
                        {me.id === id ? (
                            <a href="/dash/edit">
                                <Button placeholder="" color="purple" size="sm" type="button" onClick={() => { }}>
                                    Edit Profile
                                </Button>
                            </a>
                        ) : (
                            <Button placeholder="" color="purple" size="sm" type="button" onClick={() => { }}>
                                Follow
                            </Button>
                        )}
                    </div>
                    <div className="flex gap-4 items-center">
                        <Chip color="pink" size="sm" value={`${dataUser._count.pictures} pictures`} />
                        <Chip color="yellow" size="sm" value={`14 followers`} />
                    </div>
                    {me.id === id && (
                        <div className="flex flex-col">
                            <span className="text-[14px] font-normal">{dataUser.lastname} {dataUser.firstname}</span>
                            <span className="text-[14px] font-normal">{moment(me.createdAt).format("DD.MM.YYYY")}</span>
                            <span className="text-[14px] font-normal">{dataUser.phoneNumber}</span>
                            <span className="text-[14px] font-normal">{me.auth.email}</span>
                        </div>
                    )}
                </div>
            </div>
            <hr className="border-[#262626] my-[30px]" />
            <div className="grid grid-cols-3 gap-4">
                {picturesUser.map((image) => (
                    <div className="w-full aspect-square relative" key={image.id}>
                        {id === me.id && (
                            <div className="absolute top-1 right-1 z-30">
                                <Button placeholder="" color="red" size="sm" type="button" onClick={() => deleteThisPicture(image.id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </Button>
                            </div>
                        )}
                        <a href={`/dash/picture/${image.id}`} key={image.id}>
                            <div className="w-full aspect-square relative">
                                <img src={process.env.REACT_APP_BACKEND_URL + `/picture/download/${image.fileId}`} alt={`${image.id}`} className="w-full h-full object-cover" />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            {more && picturesUser.length > 0 && <div className="text-center mt-4">
                <Button placeholder="" color="purple" className="px-8" onClick={() => setPage(p => p + 1)}>More</Button>
            </div>}
        </div>
    );
}
