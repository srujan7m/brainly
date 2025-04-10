import axios from "axios";
import { useRef } from "react"
import { Button } from "../component/Button"
import { Input } from "../component/Input"
import { BACKEND_URL1 } from "../config";
import { useNavigate } from "react-router-dom";

export  function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(username);
        console.log(password);
        
        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }
        try {
            await axios.post(BACKEND_URL1, {
                username,
                password,
            });
            alert("Signed up successfully");
            navigate("/signin");
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    }


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef}  placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} size="md" variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}