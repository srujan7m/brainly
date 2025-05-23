
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
enum ContentType{
    YouTube = "youtube",
    Twitter = "twitter"
}
// controlled component
export function CreateContentModal({open, onClose}:any) {
    const titleRef = useRef<HTMLInputElement>(null); 
    const linkRef = useRef<HTMLInputElement>(null); 
    const [type, setType] = useState(ContentType.YouTube)

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
       await axios.post(`${BACKEND_URL}/api/v1/content`, {
        link,
        title,
        type
       },{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    })
    }


    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div>
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center" onClick={onClose}  >
           
                <div className="flex flex-col justify-center" >
            

                    <span className="bg-white opacity-100 p-4 rounded fixed"  onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        
                        <div>
                            <Input ref={titleRef} placeholder={"Title"} />
                            <Input ref={linkRef} placeholder={"Link"} />
                        </div>
                        <div className="pl-4">
                            <h1>Type:</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button size="md"text="Youtube" variant={type === ContentType.YouTube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.YouTube)
                                }}></Button>
                                <Button size="md" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                            </div>
                        
                        <div className="flex justify-center">
                            <Button onClick={() => {
                                addContent();
                                onClose()
  }}size="md" variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>

}