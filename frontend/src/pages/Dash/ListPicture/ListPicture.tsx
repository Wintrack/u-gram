import { Button, Chip, IconButton, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { Storage } from "../../../services/storage";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select'

export default function ListPicture() {
    const [query, setQuery] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [tempQuery, setTempQuery] = useState<string>("");
    const [tempTag, setTempTag] = useState<string>("");
    const [pictures, setPictures] = useState<
        {
            id: string;
            description: string;
            keyWords: string[];
            autorId: string;
            fileId: string;
            createdAt: string;
            mentions: [];
        }[]
    >([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [listOfKeywords, setListOfKeywords] = useState<{
        label: string,
        value: string,
        isCustom: boolean
    }[]>([]);
    const [listOfDescriptions, setListOfDescriptions] = useState<{
        label: string,
        value: string,
        isCustom: boolean
    }[]>([]);
    const limit = 10;

    const fetchForKeywords = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/picture", {
                headers: {
                    Authorization: `Bearer ${Storage.getToken()}`,
                },
            });
            if (response.status === 200) {
                const keywords = response.data.map((picture: any) => picture.keyWords).flat();
                keywords.sort();
                for (let i = 0; i < keywords.length; i++) {
                    if (keywords[i] === keywords[i + 1]) {
                        keywords.splice(i, 1);
                        i--;
                    }
                }
                keywords.sort();
                const keywordsOptions = keywords.map((keyword: string) => {
                    return { value: keyword, label: keyword, isCustom: false };
                });
                setListOfKeywords(keywordsOptions);

                const descriptions = response.data
                    .map((picture: any) => picture.description)
                    .flat()
                    .map((description: string) => {
                        return {
                            value: description,
                            label: description,
                            isCustom: false
                        }
                    });



                setListOfKeywords(keywordsOptions);
                setListOfDescriptions([...descriptions]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchForKeywords();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_BACKEND_URL +
                    `/picture?orderByCreation=true&tag${tag ? "&hasInKeywords=" + tag : ""}${query ? "&containInDescription=" + query : ""
                    }&page=${page}&limit=${limit}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Storage.getToken()}`,
                        },
                    }
                );
                if (response.status === 200) {
                    page > 0 ? setPictures((prevPictures) => prevPictures.concat(response.data)) : setPictures(response.data);
                    setMore(response.data?.length === limit);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchKeywords = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/picture/keywords", {
                    headers: {
                        Authorization: `Bearer ${Storage.getToken()}`,
                    },
                });
                if (response.status === 200) {
                    setKeywords(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        fetchKeywords();
    }, [page, query, tag]);

    const handleSearch = async () => {
        if (tempTag !== tag || tempQuery !== query) {
            setTag(tempTag);
            setQuery(tempQuery);
            setPictures([]);
            setPage(0);
        }
    };

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            background: "#ffffff00",
            color: "white",
            border: "1px solid #fff",
            "&:hover": {
                border: "1px solid #fff",
            },
        }),
        option: (base: any, state: any) => ({
            ...base,
            background: state.isFocused ? "#1e1e1e" : "#1e1e1e",
            color: state.isFocused ? "white" : "white",
            "&:hover": {
                background: "#1e1e1ecc",
                color: "white",
            },
        }),
        menu: (base: any, state: any) => ({
            ...base,
            background: "#1e1e1e",
            color: "white",
            "&:hover": {
                background: "#1e1e1e33",
                color: "white",
            },
        }),
        placeholder: (base: any, state: any) => ({
            ...base,
            color: "white",
        }),
        label: (base: any, state: any) => ({
            ...base,
            color: "white",
        }),
    };

    const handleDescriptionInputChange = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            const existingOption = listOfDescriptions.find(option => option.label.toLowerCase() === inputValue.toLowerCase());
            if (!existingOption) {
                const newOption = { value: inputValue.toLowerCase(), label: inputValue, isCustom: true };
                setListOfDescriptions(
                    prevList => [
                        ...prevList.filter((value) => !value.isCustom),
                        newOption
                    ]);
            }
        } else {
            setListOfDescriptions(prevList => [...prevList.filter((value) => !value.isCustom)]);
        }
    };

    const handleTagsInputChange = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            const existingOption = listOfKeywords.find(option => option.label.toLowerCase() === inputValue.toLowerCase());
            if (!existingOption) {
                const newOption = { value: inputValue.toLowerCase(), label: inputValue, isCustom: true };
                setListOfKeywords(
                    prevList => [
                        ...prevList.filter((value) => !value.isCustom),
                        newOption
                    ]);
            }
        } else {
            setListOfKeywords(prevList => [...prevList.filter((value) => !value.isCustom)]);
        }
    };

    return (
        <>
            <div className="flex gap-4 items-center mt-6 mb-4">
                <Select options={listOfDescriptions} onChange={
                    (e) => {
                        if (e) {
                            setTempQuery(e.value);
                        } else {
                            setTempQuery("");
                        }
                    }
                }
                    onInputChange={handleDescriptionInputChange}
                    placeholder="Search by description"
                    className="w-full"
                    styles={customStyles}
                    isClearable
                />
                <Select options={listOfKeywords} onChange={
                    (e) => {
                        if (e) {
                            setTempTag(e.value);
                        } else {
                            setTempTag("");
                        }
                    }
                }
                    onInputChange={handleTagsInputChange}
                    placeholder="Search by tag"
                    className="w-full"
                    styles={customStyles}
                    isClearable
                />
                <IconButton placeholder="" color="red" onClick={() => handleSearch()}>
                    <FontAwesomeIcon icon="paper-plane" />
                </IconButton>
            </div>
            {keywords.length > 0 && (
                <>
                    <Typography placeholder="" color="white">
                        Popular Keywords:
                    </Typography>
                    <div className="flex gap-4 items-center mt-1 mb-6">
                        {keywords.map((keyword) => (
                            <Chip color='purple' value={keyword} />
                        ))}
                    </div>
                </>
            )}

            <Masonry columnsCount={3} gutter="10px">
                {pictures.map((image) => (
                    <a href={`/dash/picture/${image.id}`} className="relative" key={image.id}>
                        <img
                            key={image.id}
                            alt={image.id.toString()}
                            src={process.env.REACT_APP_BACKEND_URL + `/picture/download/${image.fileId}`}
                            style={{ width: "100%", display: "block" }}
                        />
                        <Chip color="purple" size="sm" className="absolute right-1 bottom-1" value={moment(image.createdAt).format("DD.MM.YYYY")} />
                    </a>
                ))}
                {pictures.length === 0 && <p className="text-white">No pictures found.</p>}
            </Masonry>
            {more && pictures.length > 0 && (
                <div className="text-center mt-4">
                    <Button placeholder="" color="purple" className="px-8" onClick={() => setPage((p) => p + 1)}>
                        More
                    </Button>
                </div>
            )}
        </>
    );
}
