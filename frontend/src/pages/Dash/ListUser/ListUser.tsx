import { useEffect, useState } from "react";
import GenericPage from "../components/GenericPage";
import axios from "axios";
import { Storage } from "../../../services/storage";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListUser() {
    const [query, setQuery] = useState<string>("");
    const [tempQuery, setTempQuery] = useState<string>("");
    const [users, setUsers] = useState<{
        id: string,
        pseudo: string,
        firstname: string,
        lastname: string,
        phoneNumber: string,
        profilPictureId: string,
    }[]>([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const limit = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/user?${query ? 'containPseudo=' + query : ''}&page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`
                    }
                })
                if (response.status === 200) {
                    (page > 0) ? setUsers((prevUsers) => prevUsers.concat(response.data)) : setUsers(response.data);
                    setMore(response.data?.length === limit);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [page, query]);

    const handleSearch = async () => {
        if (tempQuery !== query) {
            setQuery(tempQuery);
            setUsers([]);
            setPage(0);
        }
    }

    return (
        <GenericPage titlePage="Users list" color="purple">
            {/* <Input crossOrigin="" className="text-white peer-placeholder-shown:text-white" color="purple" label="Rechercher un utilisateur" /> */}
            <div className="flex gap-4 items-center">
                <Input crossOrigin="" color="red" className="text-white" label="Search user" onChange={(e) => setTempQuery(e.target.value)} />
                <IconButton placeholder="" color="red" onClick={() => handleSearch()}>
                    <FontAwesomeIcon icon="paper-plane" />
                </IconButton>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-white mt-4">
                {users.map((user) => (
                    <a href={`/dash/profil/${user.id}`} key={user.id}>
                        <div className="flex gap-4 items-center">
                            <div className="flex h-20 w-20 items-center justify-center">
                                <div className="h-20 w-20 w-full rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-1">
                                    <img src={process.env.REACT_APP_BACKEND_URL + `/picture/download/${user.profilPictureId}`} alt={user.pseudo} className="w-full h-full object-cover object-center rounded-full" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{user.pseudo}</h2>
                            </div>
                        </div>
                    </a>
                ))}
                {users.length === 0 && <p>No users found.</p>}
            </div>
            {more && users.length > 0 && <div className="text-center mt-4">
                <Button placeholder="" color="purple" className="px-8" onClick={() => setPage(p => p + 1)}>More</Button>
            </div>}
        </GenericPage>
    )
}