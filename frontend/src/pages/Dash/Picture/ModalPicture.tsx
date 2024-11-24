import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import GenericPage from "../components/GenericPage";
import { Button, Chip, Input, Option, Radio, Select, Textarea, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Storage } from "../../../services/storage";
import { toast } from "react-toastify";

export default function ModalPicture({
    open,
    data,
    setOpen,
}: Readonly<{
    open: boolean;
    data: { id: string; description: string; keyWords: string[]; autorId: string; fileId: string; createdAt: string; mentions: [] };
    setOpen: (open: boolean) => void;
}>) {
    const cancelButtonRef = useRef(null);
    const [radioValue, setRadioValue] = useState("1920:1080");
    const [persoSize, setPersoSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [users, setUsers] = useState<{
        id: string;
        pseudo: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        profilPictureId: string;
    }[]>([]);
    const [tmpTags, setTmpTags] = useState("");
    const [datas, setDatas] = useState<{
        description: string,
        tags: string[],
        mentions: string[],
    }>({
        description: "",
        tags: [],
        mentions: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user", {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        setDatas({
            description: data.description,
            tags: data.keyWords,
            mentions: data.mentions.map(({ id }) => id),
        })
    }, [data]);

    const handleSubmit = async () => {
        const datasToSend = {
            description: datas.description,
            keyWords: datas.tags,
            mentions: datas.mentions,
            fileId: data.fileId
        }

        try {
            const response = await axios.put(process.env.REACT_APP_BACKEND_URL + `/picture/${data.id}`, datasToSend, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200) {
                toast.success("Image modifiée avec succès");
                setOpen(false);
            }
        } catch (error) {
            toast.error("Erreur lors de la modification de l'image");
        }
    }

    const handleResize = async () => {
        let sizeResize = { width: 0, height: 0 };

        if (radioValue === "1920:1080") {
            sizeResize = { width: 1920, height: 1080 };
        } else if (radioValue === "800:600") {
            sizeResize = { width: 800, height: 600 };
        } else if (radioValue === "600:400") {
            sizeResize = { width: 600, height: 400 };
        } else {
            sizeResize = persoSize;
        }

        const datasToSend = {
            id: data.fileId,
            width: sizeResize.width,
            height: sizeResize.height
        }

        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `/picture/resize-picture`, datasToSend, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Image redimensionnée avec succès");
                window.location.reload();
                setOpen(false);
            }
        } catch (error) {
            toast.error("Erreur lors du redimensionnement de l'image");
        }
    }

    const handleChangeValueRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="w-full relative transform overflow-hidden rounded-lg text-left shadow-xl bg-black px-4 transition-all sm:my-8 sm:w-auto sm:mx-8">
                                <GenericPage titlePage="Upload" color="purple">
                                    <div className="flex gap-8">
                                        <div className="flex flex-col gap-4">
                                            <Textarea
                                                className="text-white"
                                                placeholder=""
                                                color="purple"
                                                label="Description"
                                                value={datas.description}
                                                onChange={(e) => setDatas({ ...datas, description: e.target.value })}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    className="text-white"
                                                    crossOrigin=""
                                                    color="purple"
                                                    label="Tags"
                                                    value={tmpTags}
                                                    onChange={(e) => setTmpTags(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setDatas({ ...datas, tags: [...datas.tags, tmpTags] });
                                                            setTmpTags("");
                                                        }
                                                    }}
                                                />
                                                <div className="flex flex-wrap w-full gap-3 flex-row">
                                                    {datas.tags.map((tag, index) => (
                                                        <Chip
                                                            key={tag}
                                                            color="purple"
                                                            value={tag}
                                                            icon={
                                                                <FontAwesomeIcon
                                                                    icon="x"
                                                                    className="mt-1 ml-1 cursor-pointer"
                                                                    onClick={() => setDatas({ ...datas, tags: datas.tags.filter((_, i) => i !== index) })}
                                                                />
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Select className='text-white' placeholder="" color='purple' label="Mention" onChange={(e) => e && setDatas({ ...datas, mentions: [...datas.mentions, e] })}>
                                                    {users.map((user) => (
                                                        <Option key={user.id} value={user.id} disabled={datas.mentions.includes(user.id)}>{user.pseudo}</Option>
                                                    ))}
                                                </Select>
                                                <div className='flex flex-wrap w-full gap-3 flex-row mt-2'>
                                                    {users.filter((user) => datas.mentions.includes(user.id)).map((user, index) => (
                                                        <Chip key={index} color="yellow" value={user.pseudo} icon={<FontAwesomeIcon icon="x" className='mt-1 ml-1 cursor-pointer' onClick={() => setDatas({ ...datas, mentions: datas.mentions.filter((id) => id !== user.id) })} />} />
                                                    ))}
                                                    {datas.mentions.length === 0 && <p>No mention</p>}
                                                </div>
                                            </div>
                                            <Button color="pink" placeholder="" onClick={() => handleSubmit()}>
                                                Upload
                                            </Button>
                                        </div>
                                        <div className="flex flex-col ">
                                            <Typography placeholder="" variant="h6" color="white">Resize picture</Typography>
                                            <Typography placeholder="" variant="paragraph" color="white">Formats</Typography>
                                            <Radio crossOrigin='' color="purple" label="1920:1080" name="format" value="1920:1080" onChange={handleChangeValueRadio} defaultChecked={radioValue === "640:360"} />
                                            <Radio crossOrigin='' color="purple" label="800:600" name="format" value="800:600" onChange={handleChangeValueRadio} defaultChecked={radioValue === "640:480"} />
                                            <Radio crossOrigin='' color="purple" label="600:400" name="format" value="600:400" onChange={handleChangeValueRadio} defaultChecked={radioValue === "640:640"} />
                                            <Radio crossOrigin='' color="purple" label="personnalisé" name="format" value="perso" onChange={handleChangeValueRadio} defaultChecked={radioValue === "perso"} />
                                            {radioValue === "perso" && (
                                                <>
                                                    <Typography placeholder="" variant="paragraph" color="white">Format Personnalisé</Typography>
                                                    <Input crossOrigin='' placeholder="" color="purple" label="Width" value={persoSize.width} onChange={(e) => setPersoSize({...persoSize, width: Number(e.target.value) })} />
                                                    <Input crossOrigin='' placeholder="" color="purple" label="Height" value={persoSize.height} onChange={(e) => setPersoSize({...persoSize, height: Number(e.target.value) })} />
                                                </>
                                            )}

                                            <Button color="pink" placeholder="" onClick={() => handleResize()} className="mt-2">
                                                Resize
                                            </Button>
                                        </div>
                                    </div>
                                </GenericPage>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
