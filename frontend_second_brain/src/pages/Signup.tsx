import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value; 
        const password = passwordRef.current?.value;
        try {
             await axios.post(BACKEND_URL + "/signup", {
                username,
                password
            });
            alert("You have signed up!");
            navigate("/signin");
        } catch (e) {
            console.error(e);
            // Show backend error message if available
            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.message || "Signup failed. See console for details.");
            } else {
                alert("Signup failed. See console for details.");
            }
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}