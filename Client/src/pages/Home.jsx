import React, { useContext } from 'react';
import Sidebar from '../Components/Sidebar';
import ChatContainer from '../Components/ChatContainer';
import RightSidebar from '../Components/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const Home = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className={`
        w-full h-full max-w-[1600px] mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        ${selectedUser ? 'xl:grid-cols-[1fr_2fr_1fr]' : 'xl:grid-cols-2'}
        transition-all duration-300
        rounded-2xl overflow-hidden
        backdrop-blur-xl 
      `}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
