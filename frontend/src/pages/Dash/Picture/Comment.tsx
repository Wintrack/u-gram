import { Card, CardBody } from "@material-tailwind/react";
import moment from "moment";

export default function Comment({
    text,
    author,
    createdAt,
    myId,
}: Readonly<{
    text: string,
    author: {
        id: string,
        pseudo: string,
    },
    createdAt: string,
    myId: string,
}>) {
    return (
        <Card placeholder="" className="bg-white/20 pa-2 mt-2">
            <CardBody placeholder="">
                <legend className="text-xs">{(myId === author.id) ? 'You' : author.pseudo} - {moment(createdAt).fromNow()}</legend>
                <p className="text-white">{text}</p>
            </CardBody>
        </Card>
    );
}