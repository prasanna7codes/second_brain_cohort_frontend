import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
//import { ShareIcon } from "../icons/ShareIcon";
import { LogOut } from "../icons/LogOutIcon";

import { SideBar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
    //const [copied, setCopied] = useState(false); THIS WILL BE USED WHEN WE COPY THE LINK FOR SHARING BRAIN

  type Content = { type: string; link: string; title: string; _id?: string };
  const { contents, refresh } = useContent() as { contents: Content[]; refresh: () => void };
  const [filterType, setFilterType] = useState<"all" | "youtube" | "twitter" | "document">("all");
    const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  // Filter contents based on filterType
  const filteredContents =
    filterType === "all"
      ? contents
      : contents.filter(
          (content) =>
            typeof content.type === "string" &&
            content.type.toLowerCase() === filterType
        );

      const handleDelete = async (_id: string) => {
        try {
          await axios.delete(`${BACKEND_URL}/content/${_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          refresh();
        } catch (error) {
          alert("Failed to delete content.");
          console.error(error);
        }
      };

  return (
    <div>
      <SideBar setFilterType={setFilterType} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
         <div className="flex justify-end gap-4 mb-4">
        <Button
          text="Logout"
          variant="secondary"
          startIcon={<LogOut />}

          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="px-6 py-2"
        />
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          variant="primary"
          text="Add content"
          startIcon={<PlusIcon />}
        />
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
    { /*    <Button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/brain/share`,
              { share: true },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true); // Show copied message
              setTimeout(() => setCopied(false), 1000); // Hide after 2s
          }}
          variant="secondary"
          text="Share brain"
          startIcon={<ShareIcon />}
        />*/}


        {
          //I WILL ADD THE SHARE BRAIN FEATURE LATER 
        }




      </div>
      {/*{copied && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition">
            Link copied!
          </div>
      )}*/} 

      
        {
          //I WILL ADD THE SHAR EBRAIN FEATURE LATER 
        }
       

        <div className="flex gap-4 flex-wrap mt-6">
          {filteredContents.map(({ type, link, title, _id }) => (
            <Card
              key={_id || link + title}
              type={type as "youtube" | "twitter"}
              link={link}
              title={title}
              _id={_id}
            onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
