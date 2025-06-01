import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  type Content = { type: string; link: string; title: string; _id?: string };
  const { contents, refresh } = useContent() as { contents: Content[]; refresh: () => void };
  const [filterType, setFilterType] = useState<"all" | "youtube" | "twitter">("all");

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

  return (
    <div>
      <Sidebar setFilterType={setFilterType} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap mt-6">
          {filteredContents.map(({ type, link, title, _id }) => (
            <Card
              key={_id || link + title}
              type={type as "youtube" | "twitter"}
              link={link}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}