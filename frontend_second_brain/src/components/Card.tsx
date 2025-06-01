import { useEffect } from "react";
//import { ShareIcon } from "../icons/ShareIcon";
import { Delete } from "../icons/DeleteIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentIcon } from "../icons/DocumentIcon"; 




declare global {
    interface Window {
        twttr?: {
            widgets?: {
                load: () => void;
            };
        };
    }
}

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document";
    _id?: string;
    onDelete?: (_id: string) => void;

}

export function Card({title, link, type,_id, onDelete}: CardProps) {
    useEffect(() => {
        if (type.toLowerCase() === "twitter" && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [type, link]);

    let TypeIcon = null;
    if (type === "youtube") TypeIcon = <YoutubeIcon />;
    else if (type === "twitter") TypeIcon = <TwitterIcon />;
    else if (type === "document") TypeIcon = <DocumentIcon />;

    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        {TypeIcon}
                    </div>
                    <div className="font-bold">
                        {title}
                    </div>
                </div>
                <div className="flex items-center">
                   
                    <div
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                  onClick={() => _id && onDelete && onDelete(_id)}
                  title="Delete"
                >
                    <Delete />
                </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
                
                {type === "document" && (
          <div className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-2 rounded">
            {link}
          </div>
        )}
            </div>

        </div>
    </div>
}