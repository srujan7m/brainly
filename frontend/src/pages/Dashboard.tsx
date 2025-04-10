
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


function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  return (
    <>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4">
      <Button onClick={async ()=>{
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
          share:true
        },{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        const shareUrl = `http://localhost:5173/share/${response.data.hash}`
      }}startIcon={<ShareIcon size="md" />} variant="secondary" text="Share Content" size="md" />
      <Button onClick={() => {
          setModalOpen(true)
        }} startIcon={<PlusIcon size="md" />} variant="primary" text="Add content" size="md" />
    </div>
      <div className='flex min-w-46 min-h-72 p-3 flex-wrap'>
      {contents.map(({type,title,link})=><Card
       type={type} link={link} title={title}
      />)}
      
      </div>
      </div>
    </>
  );
}

export default Dashboard;