import React, { useContext, useEffect, useState } from 'react';
import assets, { imagesDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImage, setMsgImages] = useState([]);
  const navigate = useNavigate();

  // get all images
  useEffect(() => {
    setMsgImages(
      Array.isArray(messages)
        ? messages.filter(msg => msg.image).map(msg => msg.image)
        : []
    );
  }, [messages]);

  // Safely check if onlineUsers is an array before using includes
  const isUserOnline =
    Array.isArray(onlineUsers) && selectedUser
      ? onlineUsers.includes(selectedUser._id)
      : false;

  return selectedUser && (
    <div className={`bg-gradient-to-b from-purple-900/95 via-purple-800/90 to-purple-900/95 
      text-white w-full min-h-screen relative overflow-y-auto backdrop-blur-sm
      ${selectedUser ? "max-md:hidden" : ""} 
      shadow-2xl border-l border-purple-700/50`}>
      
      {/* Header Section */}
      <div className='pt-8 pb-6 flex flex-col items-center gap-3 px-6'>
        {/* Profile Picture with Online Status */}
        <div className='relative'>
          <div className='w-24 h-24 rounded-full p-1 bg-gradient-to-r from-purple-400 to-pink-400'>
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt='Profile'
              className='w-full h-full rounded-full object-cover border-2 border-white/20' 
            />
          </div>
          {isUserOnline && (
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
              border-3 border-white shadow-lg flex items-center justify-center'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-semibold bg-gradient-to-r from-white to-purple-200 
            bg-clip-text text-transparent'>
            {selectedUser.fullName}
          </h1>
          <p className='text-purple-200/80 text-sm font-light leading-relaxed max-w-xs'>
            {selectedUser.bio || "Hey there! I'm using this chat app."}
          </p>
          <div className='flex items-center justify-center gap-2 text-xs text-purple-300/70'>
            <div className={`w-2 h-2 rounded-full ${isUserOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span>{isUserOnline ? 'Online' : 'Last seen recently'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 mt-4'>
          {/* <button className='bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 
            hover:to-purple-700 text-white text-sm font-medium py-2.5 px-6 rounded-full 
            transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            Message
          </button> */}
          <button 
            onClick={() => logout()} 
            className='bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600 
            hover:to-red-700 text-white text-sm font-medium py-2.5 px-6 rounded-full 
            transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl 
            backdrop-blur-sm'>
            Logout
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className='mx-6 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent'></div>

      {/* Media Section */}
      <div className='px-6 py-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-medium text-purple-100'>Media</h3>
          <span className='text-xs text-purple-300/70 bg-purple-800/30 px-2 py-1 rounded-full'>
            {msgImage.length} files
          </span>
        </div>
        
        {msgImage.length > 0 ? (
          <div className='grid grid-cols-2 gap-3 max-h-80 overflow-y-auto 
            scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900/50'>
            {msgImage.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url)} 
                className='group cursor-pointer rounded-xl overflow-hidden bg-purple-800/20 
                  hover:bg-purple-700/30 transition-all duration-300 transform hover:scale-105 
                  shadow-lg hover:shadow-xl border border-purple-600/20 hover:border-purple-500/40'>
                <div className='aspect-square overflow-hidden'>
                  <img 
                    src={url} 
                    alt={`Media ${index + 1}`}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' 
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end'>
                  <div className='p-2 text-xs text-white/90 font-medium'>
                    View Image
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 text-purple-300/60'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-purple-800/30 flex items-center justify-center'>
              <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
              </svg>
            </div>
            <p className='text-sm'>No media shared yet</p>
          </div>
        )}
      </div>

      {/* Additional Info Section */}
      <div className='px-6 py-4 border-t border-purple-700/30'>
        <div className='space-y-3 text-sm'>
          <div className='flex justify-between items-center text-purple-200/80'>
            <span>Joined</span>
            <span className='text-purple-300'>Recently</span>
          </div>
          <div className='flex justify-between items-center text-purple-200/80'>
            <span>Messages</span>
            <span className='text-purple-300'>{Array.isArray(messages) ? messages.length : 0}</span>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-purple-600::-webkit-scrollbar-thumb {
          background-color: rgb(147 51 234);
          border-radius: 2px;
        }
        .scrollbar-track-purple-900::-webkit-scrollbar-track {
          background-color: rgb(88 28 135 / 0.5);
        }
      `}</style>
    </div>
  );
}

export default RightSidebar;