import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    function refresh() {
        try {
            axios.get(`${BACKEND_URL}/content`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setContents(response.data.result)
            })
            .catch((error) => {
                console.error("Failed to fetch content:", error);
            });
        } catch (error) {
            console.error("Unexpected error in refresh:", error);
        }
    }

    useEffect(() => {
        refresh()
        const interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh};
}