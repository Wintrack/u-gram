import axios from "axios";
import { Storage } from "../../../services/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { IconButton, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentsSection({
    myId,
}: Readonly<{
    myId: string,
}>) {
    const [comments, setComments] = useState<{
        id: string,
        text: string,
        authorId: string,
        pictureId: string,
        createdAt: string,
        author: {
            id: string,
            pseudo: string,
        }
    }[]>([]);
    const [text, setText] = useState<string>("");
    const { id } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/picture/${id}/comment`, {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`
                    }
                });
                if (response.status === 200) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchComments();
    }, [id]);

    const updateText = (value: string) => {
        if (value.length < 200) {
            setText(value);
        }
    }

    const postComment = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `/picture/${id}/comment`, {
                text
            }, {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`
                }
            });
            if (response.status === 201) {
                setText("");
                setComments([response.data, ...comments]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex align-middle gap-4">
                <Input
                    className="text-white"
                    crossOrigin=""
                    placeholder=""
                    color="purple"
                    label="Add a comment"
                    value={text}
                    onChange={(e) => updateText(e.target.value)}
                />
                <IconButton placeholder="" color="red" onClick={() => postComment()} disabled={!text.trim()}>
                    <FontAwesomeIcon icon="paper-plane" />
                </IconButton>
            </div>
            <div className="mt-4">
                <details>
                    <summary>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</summary>
                    {comments.map((comment) => (
                        <Comment text={comment.text} author={comment.author} createdAt={comment.createdAt} myId={myId} />
                    ))}
                </details>
            </div>
        </div>
    );
}