// import { useRef } from "react";
import { Button } from "../component/Button"
import { Input } from "../component/Input"
import { useRef } from "react"
import {  BACKEND_URL2 } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin() {
        const usernameRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const navigate = useNavigate();
        async function signin(){
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(BACKEND_URL2,{
                    username,
                    password
            })
            const jwt = response.data.token
            localStorage.setItem("token", jwt)
            navigate("/dashboard")
        }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef}  placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} size="md"/>
            </div>
        </div>
    </div>
}