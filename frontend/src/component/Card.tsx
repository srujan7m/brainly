import { useEffect } from "react"
import { DeleteIcon } from "../icons/DeleteIcon"
import { YTIcon } from "../icons/YtIcon"
import { XIcon } from "../icons/TwitterIcon"
import { RedirectIcon } from "../icons/RedirectIcon"

interface CardProps{
    title:string
    link:string
    type:"twitter" | "youtube" 
    onClickDelete? : (title:string) => void;
}

export const Card = ({title ,link ,type, onClickDelete}: CardProps)=>{
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

                <div className="text-gray-500 cursor-pointer" onClick={()=>{
                    onClickDelete && onClickDelete(title)
                }} >
                    <DeleteIcon size="md"/>
                    </div>
                </div>
               
           </div>
           <div className="p-4">
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