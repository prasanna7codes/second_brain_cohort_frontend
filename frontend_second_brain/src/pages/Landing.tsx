import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-extrabold mb-4 text-gray-900 tracking-tight">
        Brainly
      </h1>
      
      <p className="mb-10 text-xl text-gray-700 text-center leading-relaxed font-medium max-w-2xl">
        Effortlessly <span className="font-bold">save</span>, <span className="font-bold">organize</span>, and <span className="font-bold">share</span> your favorite links.<br />
        Never lose track of what matters most.
      </p>
      <div className="flex gap-8">
        <Button
          text="Sign Up"
          variant="primary"
          onClick={() => navigate("/signup")}
          className="transition-transform hover:scale-105 hover:shadow-lg text-lg px-8 py-3"
        />
        <Button
          text="Sign In"
          variant="secondary"
          onClick={() => navigate("/signin")}
          className="transition-transform hover:scale-105 hover:shadow-lg text-lg px-8 py-3"
        />
      </div>
    </div>
  );
}