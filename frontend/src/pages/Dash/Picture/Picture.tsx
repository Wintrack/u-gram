import { Button, Chip, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import GenericPage from "../components/GenericPage";
import { useNavigate, useParams } from "react-router-dom";
import ModalPicture from "./ModalPicture";
import axios from "axios";
import { Storage } from "../../../services/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LikesModal from "./LikesModal";
import CommentsSection from "./CommentsSection";

export default function Picture() {
    const [urlToPrint, setUrlToPrint] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);
    const [openLikesModal, setOpenLikesModal] = useState(false);
    const [whoAmI, setWhoAmI] = useState("")
    const [users, setUsers] = useState<{
        id: string;
        pseudo: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        profilPictureId: string;
    }[]>([]);
    const [picture, setPicture] = useState<{
        id: string,
        description: string,
        keyWords: string[],
        autorId: string,
        fileId: string,
        createdAt: string,
        autor: {
            id: string,
            pseudo: string,
        },
        mentions: [],
        likes: { id: string, pseudo: string }[],
    }>({
        id: "",
        description: "",
        keyWords: [],
        autorId: "",
        fileId: "",
        createdAt: "",
        autor: {
            id: "",
            pseudo: "",
        },
        mentions: [],
        likes: [],
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const whoAM = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/me", {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (whoAM.status === 200) {
                    setWhoAmI(whoAM.data.id);
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const users = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user", {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (users.status === 200) {
                    setUsers(users.data);
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/picture/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`
                    }
                });
                if (response.status === 200 || response.status === 201 || response.status === 204 || response.status === 304 ) {
                    setPicture(response.data);
                    setUrlToPrint(process.env.REACT_APP_BACKEND_URL + `/picture/download/${response.data.fileId}`);
                }
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    navigate('/dash/picture-not-found');
                }
            }
        }
        fetchData();
    }, [id, navigate]);

    const correspondToWho = (id: string) => {
        return users.find((user) => user.id === id)?.pseudo;
    }

    const handleRecheck = async () => {
        setOpenModal(!openModal);
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/picture/${id}`, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`
                }
            });
            if (response.status === 200 || response.status === 201 || response.status === 204 || response.status === 304 ) {
                setPicture(response.data);
                setUrlToPrint(process.env.REACT_APP_BACKEND_URL + `/picture/download/${response.data.fileId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleLike = async () => {
        try {
            const response = await axios.patch(process.env.REACT_APP_BACKEND_URL + `/picture/${id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`
                }
            });
            if (response.status === 200) {
                setPicture(response.data);
                setUrlToPrint(process.env.REACT_APP_BACKEND_URL + `/picture/download/${response.data.fileId}`); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="text-white max-w-[935px] pt-[30px] flex flex-col md:flex-row gap-4 justify-around">
            <ModalPicture open={openModal} data={picture} setOpen={handleRecheck} />
            <LikesModal open={openLikesModal} likes={picture.likes} setOpen={() => setOpenLikesModal(!openLikesModal)} />
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="h-64 mt-12 relative flex flex-col justify-between bg-white/20 rounded-xl">
                    <img
                        src={
                            (picture.fileId)
                                ? urlToPrint
                                : "https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/601082646d6bf4446451b0a4_6002086f72b72717ae01d954_google-doc-error-message.png"
                        }
                        alt="profile"
                        className="h-full w-full rounded-xl object-cover object-center"
                    />
                </div>
                <div>
                    {picture.likes?.some((user) => user.id === whoAmI) ?
                        <span className="cursor-pointer" onClick={() => toggleLike()}>
                            <FontAwesomeIcon icon="heart" className="mr-2" color="deeppink" />
                            liked
                        </span> :
                        <span className="cursor-pointer" onClick={() => toggleLike()}>
                            <FontAwesomeIcon icon="heart" className="mr-2" />
                            like this picture
                        </span>
                    }
                    <div className="cursor-pointer" onClick={() => { setOpenLikesModal(!openLikesModal) }}>
                        {picture.likes.length} {picture.likes.length > 1 ? 'likes' : 'like'}
                    </div>
                </div>
                <CommentsSection myId={whoAmI} />
            </div>
            <div className="w-full md:w-1/3">
                <GenericPage titlePage="Upload" color="purple">
                    <div className="flex flex-col gap-4">
                        <legend className="text-white">By <a href={`/dash/profil/${picture.autor?.id}`}>{picture.autor?.pseudo}</a></legend>
                        {id && picture.description && (
                            <Textarea
                                className="text-white disabled:bg-white/10"
                                placeholder=""
                                color="purple"
                                label="Description"
                                value={picture.description}
                                disabled
                            />
                        )}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap w-full gap-3 flex-row">
                                {id && picture.keyWords.length > 0 && picture.keyWords.map((tag) => tag !== "" && <Chip key={tag} color="purple" value={tag} />)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap w-full gap-3 flex-row">
                                {id && picture.mentions.length > 0 && picture.mentions.map((mention: { id: string }) => (
                                    <Chip key={mention.id} color="yellow" value={correspondToWho(mention.id)} />
                                ))}
                            </div>
                        </div>
                        {id && picture.autorId === whoAmI && (
                            <Button color="pink" placeholder="" onClick={() => setOpenModal(!openModal)}>
                                Edit Picture
                            </Button>
                        )}
                    </div>
                </GenericPage>
            </div>
        </div>
    );
}
