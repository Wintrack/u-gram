import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import GenericPage from "../components/GenericPage"
import Masonry from "react-responsive-masonry";

export default function LikesModal({
    open,
    likes,
    setOpen,
}: Readonly<{
    open: boolean,
    likes: { id: string, pseudo: string }[],
    setOpen: (open: boolean) => void
}>) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
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
                    <div className="w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                <button className="max-h-0"></button>
                                <GenericPage titlePage="Likes" color="purple">
                                    <Masonry>
                                        {likes.map((user) => (
                                            <a href={`/dash/profil/${user.id}`} key={user.id}>
                                                <h2 className="text-lg text-white">{user.pseudo}</h2>
                                            </a>
                                        ))}
                                    </Masonry>
                                    {likes.length === 0 && <p>No like.</p>}
                                </GenericPage>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}