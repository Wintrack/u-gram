import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import GenericPage from '../components/GenericPage';
import axios from 'axios';
import { Storage } from '../../../services/storage';
import { toast } from 'react-toastify';

export default function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tmpTags, setTmpTags] = useState<string>("");
    const [fileList, setFileList] = useState<any[]>([]);
    const [datas, setDatas] = useState<{
        description: string,
        tags: string[],
        mentions: string[]
    }>({
        description: "",
        tags: [],
        mentions: [],
    });
    const [users, setUsers] = useState<{
        id: string;
        pseudo: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        profilPictureId: string;
    }[]>([]);

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
    }, []);

    const onDrop = (acceptedFiles: any) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const newFiles = Array.from(acceptedFiles).map((file: any) => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
            }));
            setFileList((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const { getRootProps, isDragActive } = useDropzone({ onDrop });

    const handleFileInputChange = (e: any) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFiles = Array.from(files).map((file: any) => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
            }));
            setFileList((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleSubmit = async () => {
        if (fileList.length === 0) {
            toast.error("No image to upload");
            return;
        }

        fileList.forEach(async (file) => {
            try {
                const formData = new FormData();
                formData.append("picture", file.file);
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/picture/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    const datasToSend: any = {
                        description: datas.description,
                        keyWords: datas.tags,
                        mentions: datas.mentions,
                        fileId: response.data.id
                    }

                    try {
                        const resp = await axios.post(process.env.REACT_APP_BACKEND_URL + `/picture`, datasToSend, {
                            headers: {
                                Authorization: `Bearer ${Storage.getToken()}`,
                            },
                        });
                        if (resp.status === 200 || resp.status === 201) {
                            toast.success("Image successfully uploaded ");
                        } else {
                            toast.error("Failed to upload image");
                        }
                    } catch (error) {
                        toast.error("Failed to upload image");
                    }
                }
            } catch (error) {
                toast.error("Failed to upload image");
            }
        })
        clearAfterSubmit();
    };

    const clearAfterSubmit = () => {
        setFileList([]);
        setDatas({
            description: "",
            tags: [],
            mentions: []
        });
    };

    return (
        <div className="text-white max-w-[935px] pt-[30px] flex flex-col md:flex-row gap-4 justify-around">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="h-64 mt-12 relative flex flex-col justify-between bg-white/20 rounded-xl" {...getRootProps()}>
                    {isDragActive ? (
                        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-purple-500 rounded-lg z-10">
                            <FontAwesomeIcon icon="cloud" />
                            <Typography placeholder="" variant="h5">Drop your files here</Typography>
                        </div>
                    ) : (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileInputChange}
                                className="hidden"
                            />
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-purple-500 rounded-lg z-10">
                                <FontAwesomeIcon icon="cloud" />
                                <Typography placeholder="" variant="h5">Drop your files here</Typography>
                            </button>
                        </>
                    )}
                </div>
                {fileList.length > 0 && (
                    <div className='w-full px-4 py-2 rounded-lg bg-white/20'>
                        <div className="grid grid-cols-3 gap-2">
                            {fileList.map((file, index) => (
                                <div key={index} className="relative h-24 bg-white/20 rounded-lg">
                                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                                    <button className='align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none absolute top-1 right-1 cursor-pointer' onClick={() => setFileList(fileList.filter((_, i) => i !== index))}>
                                        <FontAwesomeIcon icon="x" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='w-full md:w-1/3'>
                <GenericPage titlePage="Upload" color="purple">
                    <div className='flex flex-col gap-4'>
                        <Textarea className='text-white' placeholder="" color='purple' label="Description" value={datas.description} onChange={(e) => setDatas({ ...datas, description: e.target.value })} />
                        <div className='flex flex-col gap-2'>
                            <Input className='text-white' crossOrigin="" color='purple' label="Tags" value={tmpTags} onChange={(e) => setTmpTags(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setDatas({ ...datas, tags: [...datas.tags, tmpTags] })
                                    setTmpTags("")
                                }
                            }} />
                            <legend>Press enter to add tag.</legend>
                            <div className='flex flex-wrap w-full gap-3 flex-row'>
                                {datas.tags.map((tag, index) => (
                                    <Chip key={tag} color="purple" value={tag} icon={<FontAwesomeIcon icon="x" className='mt-1 ml-1 cursor-pointer' onClick={() => setDatas({ ...datas, tags: datas.tags.filter((_, i) => i !== index) })} />} />
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
                        <Button color="pink" placeholder="" onClick={() => handleSubmit()}>Upload</Button>
                    </div>
                </GenericPage>
            </div >
        </div >
    )
}