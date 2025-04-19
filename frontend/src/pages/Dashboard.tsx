
import { Button } from '../component/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../component/Card';
import { Sidebar } from '../component/Sidebar';
import { useEffect, useState } from 'react';
import { useContent } from '../hooks/useContext';
import { CreateContentModal } from '../component/CreateContentModal';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { DeleteContent } from '../component/DeleteContentModl';
import { ShareURL } from '../component/ShareUrlModal';


function Dashboard() {
  const [contentmodalOpen, setContentModalOpen] = useState(false);
  const [deletemodalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"twitter" | "youtube" | null>(null);
  

  const handleDeleteClick = (title: string, link: string, type: "twitter" | "youtube") => {
    setSelectedTitle(title); 
    setSelectedLink(link);
    setSelectedType(type); 
    setDeleteModalOpen(true);
  };
  const handleShareClick = () => {
    setShareModalOpen(true); // Open the ShareURL modal
  };

  useEffect(() => {
    refresh();
  }, [contentmodalOpen])
  

  return (
    <>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={contentmodalOpen} onClose={() => {
        setContentModalOpen(false);
      }} />
      <ShareURL
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
      <div className="flex justify-end gap-4">
      <Button onClick={handleShareClick}startIcon={<ShareIcon size="md" />} variant="secondary" text="Share Content" size="md" 
      />
      <Button onClick={() => {
          setContentModalOpen(true)
        }} startIcon={<PlusIcon size="md" />} variant="primary" text="Add content" size="md" />
    </div>
      <div className='flex min-w-46 min-h-72 p-3 flex-wrap'>
      {contents.map(({type,title,link, })=><Card
       type={type} link={link} title={title} onClickDelete={() => handleDeleteClick(title,link,type)} 
       />
      )}
      
      </div>
      <DeleteContent
        open={deletemodalOpen}
        onClose={() => setDeleteModalOpen(false)} 
        title={selectedTitle} 
        link={selectedLink}
        type={selectedType}
      />
      </div>
    </>
  );
}

export default Dashboard;