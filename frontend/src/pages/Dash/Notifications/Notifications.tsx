import axios from "axios";
import { useEffect, useState } from "react";
import { Storage } from "../../../services/storage";
import { Card, CardBody } from "@material-tailwind/react";

export default function Notifications() {
    const [notifications, setNotifications] = useState<{
        id: string,
        content: string,
        userId: string,
    }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/notification", {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (response.status === 200) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="text-white">
            {notifications.length === 0 && <p>No notifications.</p>}
            {notifications.map((notification) => (
                <Card placeholder="" className="bg-white/20 pa-2 mt-2">
                    <CardBody placeholder="">
                        <p className="text-white">{notification.content}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}