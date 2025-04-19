import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "./Button";
import { Card } from "./Card";

interface DeleteContentProps{
    open : boolean
    onClose :()=> void
    title : string|null;
    link : string|null;
    type: "twitter" | "youtube" | null;

}

export function DeleteContent({open, onClose,title,link,type}: DeleteContentProps){
    
    const handleDelete= async() => {
        const token = localStorage.getItem("token");
      
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
          data: { title },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.error("Error:", err.response?.data?.message || err.message);
        });
      };
if(!open) return null;

return (
    <div>
      {open && (
        <>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-40" />
          <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50"
            onClick={onClose}
          >
            <div
              className="bg-white p-6 rounded shadow-md"
              onClick={(e) => e.stopPropagation()} 
            >
              <h2 className="text-lg font-bold">Delete Content</h2>
              {title && link && type && (
                <Card
                  title={title}
                  link={link}
                  type={type}
                />
              )}
              <p>Are you sure you want to delete "{title}"?</p>
              <div className="flex justify-end gap-2 mt-4">
                
                    <Button size="md" variant="secondary" text="Cancel"  onClick={onClose} />
                    <Button size="md" variant="primary" text="Yes, Delete It!"  onClick ={() => { handleDelete(); onClose(); }}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}  