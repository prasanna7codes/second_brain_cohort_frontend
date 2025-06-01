import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Document ="document",
}

// controlled component
interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({open, onClose}: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [docContent, setDocContent] = useState("");

    async function addContent() {
        const title = titleRef.current?.value;
        const link = type === ContentType.Document ? docContent : linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        onClose();
        setDocContent("");
    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            {type === ContentType.Document ? (
                                <textarea
                                    className="w-full border rounded px-2 py-1 mb-2"
                                    rows={5}
                                    placeholder="Write your document here..."
                                    value={docContent}
                                    onChange={e => setDocContent(e.target.value)}
                                />
                            ) : (
                                <Input reference={linkRef} placeholder={"Link"} />
                            )}
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)} />
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)} />
                                <Button text="Document" variant={type === ContentType.Document ? "primary" : "secondary"} onClick={() => setType(ContentType.Document)} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>     
            </div>
        </div>}
    </div>
}