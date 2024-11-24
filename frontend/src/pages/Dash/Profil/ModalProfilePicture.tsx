import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import GenericPage from "../components/GenericPage";
import axios from "axios";
import { toast } from "react-toastify";
import { Storage } from "../../../services/storage";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

export default function ModalProfilePicture({
    open,
    setOpen,
}: Readonly<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>) {
    const webcamRef = useRef<any>(null);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

    const capture = useCallback(async  () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const file = await dataURItoFile(imageSrc, 'profile_picture.jpg');
            handleUploadPictureProfile(file);
        }
    }, [webcamRef]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUploadPictureProfile = async (imgSrc: File) => {
        const formData = new FormData();
        formData.append("picture", imgSrc);
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/picture/upload", formData, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 201) {
                const datas = {
                    profilPictureId: response.data.id,
                };
                try {
                    const response = await axios.put(
                        process.env.REACT_APP_BACKEND_URL + "/user",
                        datas,
                        {
                            headers: {
                                Authorization: `Bearer ${Storage.getToken()}`,
                            },
                        }
                    );
                    if (response.status === 200 || response.status === 204 || response.status === 201) {
                        toast.success("Profil picture updated");
                        window.location.reload();
                        setOpen(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dataURItoFile = (dataURI: string, fileName: string): Promise<File> => {
        const arr = dataURI.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return Promise.resolve(new File([u8arr], fileName, { type: mime }));
    }

    useEffect(() => {
        if (open) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    setCameraStream(stream);
                })
                .catch((err) => console.error("Error accessing camera:", err));
        } else {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
                setCameraStream(null);
            }
        }
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => setOpen(false)}>
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
                                    <div className="flex flex-col items-center gap-8">
                                        <Webcam
                                            audio={false}
                                            height={400}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            width={400}
                                            videoConstraints={videoConstraints}
                                        />
                                        <button onClick={capture}>Capture photo</button>
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
