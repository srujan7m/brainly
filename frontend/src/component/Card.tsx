import { useEffect } from "react"
import { DeleteIcon } from "../icons/DeleteIcon"
import { YTIcon } from "../icons/YtIcon"
import { XIcon } from "../icons/TwitterIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { RedirectIcon } from "../icons/RedirectIcon"

interface CardProps{
    title:string
    link:string
    type:"twitter" | "youtube" 
}

export const Card = ({title ,link ,type}: CardProps)=>{
    useEffect(() => {
        if (type === "twitter") {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [type]);

    
    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === "youtu.be") {
                return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
            }
            if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
                return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
            }
            return url; // Return the original URL if it doesn't match expected patterns
        } catch (error) {
            console.error("Invalid YouTube URL:", url);
            return url;
        }
    };


    const Delete_content = () => {
        const token = localStorage.getItem("token");
      
        axios.delete(`${BACKEND_URL}/api/v1/content`, {
          data: { title },
          headers: {
            Authorization: token, // ✅ No 'Bearer' prefix
          },
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.error("Error:", err.response?.data?.message || err.message);
        });
      };
    
    return (
       <div className="p-2">
        <div className="bg-white rounded-md border-gray-200 p-8 max-w-sm border shadow-md ">
           <div className="flex justify-between">
                <div className="flex  item-center text-md ">
                <div  className="text-gray-700 pr-2" >
                {type === "youtube" && (<YTIcon size="lg"/>)}
                {type === "twitter" && (<XIcon
                    size="lg"/>)}
                </div>
                {title}
                </div>
                <div  className="flex ">
                <div className="pr-2 text-gray-500">
                <a href={link} target="_blank">
               <RedirectIcon size="md"/>
                    </a>
                    </div>

                <div className="text-gray-500 cursor-pointer" >
                    <DeleteIcon size="md"  onClick={Delete_content}/>
                    </div>
                </div>
               
           </div>
           <div className="p-4">
           {/* Render YouTube embed if type is "youtube" */}
           {type === "youtube" && (
                       <iframe
                       className="w-full h-64"
                       src={getYouTubeEmbedUrl(link)}
                       title="YouTube video player"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                       referrerPolicy="strict-origin-when-cross-origin"
                       allowFullScreen
                   ></iframe>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
           </div>
        </div> 
        </div>
    )
}