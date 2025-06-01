import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick ?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    className?:string;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
    "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300 transition-colors",
};

const defaultStyles = "px-4 py-2 rounded-md font-bold flex items-center";


export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps) {
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45	" : ""}`} disabled={loading}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}