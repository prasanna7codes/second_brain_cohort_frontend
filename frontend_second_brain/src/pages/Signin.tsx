import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(BACKEND_URL + "/signin", {
                username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (error) {
            alert("Signin failed. Please check your credentials.");
            console.error(error);
        }
    }
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
        <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <button
                className="ml-2 text-purple-600 hover:underline font-semibold"
                onClick={() => navigate("/signup")}
            >
                Sign Up
            </button>
        </div>
    </div>
}