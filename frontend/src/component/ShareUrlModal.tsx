import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

interface ShareUrlModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShareURL = ({ open, onClose }: ShareUrlModalProps) => {
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const generateShareUrl = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const url = `http://localhost:5173/share/${response.data.hash}`;
      setShareUrl(url);
    } catch (error) {
      console.error("Error generating share URL:", error);
    }
  };

  if (open && !shareUrl) {
    generateShareUrl();
  }

  if (!open) return null;

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
              <h2 className="text-lg font-bold mb-4">Shareable URL</h2>
              {shareUrl}
                <div>
                  <p className="mb-4">Here is your shareable URL:</p>
                  <input
                    type="text"
                    value={shareUrl || ""}
                    readOnly
                    className="w-full p-2 border rounded mb-4"
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigator.clipboard.writeText(shareUrl || "")}
                  >
                    Copy to Clipboard
                  </button>
                </div>
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};