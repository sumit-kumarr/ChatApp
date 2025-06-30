import React, { useContext, useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import AuthContext from '../../context/AuthContext';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    
    setIsTyping(true);
    await sendMessage({ text: input.trim() });
    setInput("");
    setIsTyping(false);
  };

  const HandleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image")) {
      if (typeof toast !== "undefined") toast.error("Select An Image File");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const safeOnlineUsers = Array.isArray(onlineUsers) ? onlineUsers : [];
  const isChatbot = selectedUser?._id === 'chatbot';
  const isUserOnline = isChatbot ? true : safeOnlineUsers.includes(selectedUser?._id);

  return selectedUser ? (
    <div className='h-full w-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden'>
      {/* Enhanced Header - Fixed height */}
      <div className='flex-shrink-0 flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-xl'>
        <div className='relative flex-shrink-0'>
          <img 
            src={selectedUser.profilePic || assets.avatar_icon} 
            alt='' 
            className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-400/50 shadow-lg object-cover' 
          />
          {isUserOnline && (
            <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse'></div>
          )}
        </div>
        
        <div className='flex-1 min-w-0'>
          <h3 className='text-white text-base sm:text-lg font-semibold tracking-wide truncate'>
            {isChatbot ? 'Your Chatbot' : selectedUser.fullName}
          </h3>
          <p className='text-xs sm:text-sm text-gray-300'>
            {isUserOnline ? (
              <span className='flex items-center gap-1'>
                <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse'></span>
                Online
              </span>
            ) : (
              'Last seen recently'
            )}
          </p>
        </div>

        <div className='flex items-center gap-1 sm:gap-3 flex-shrink-0'>
          <button className='p-2 hover:bg-white/10 rounded-full transition-all duration-200 hidden sm:block'>
            <img src={assets.help_icon} alt='' className='w-4 h-4 sm:w-5 sm:h-5 opacity-70 hover:opacity-100' />
          </button>
          <button 
            onClick={() => setSelectedUser(null)}
            className='p-2 hover:bg-white/10 rounded-full transition-all duration-200 sm:hidden'
          >
            <img src={assets.arrow_icon} alt='' className='w-5 h-5 sm:w-6 sm:h-6' />
          </button>
        </div>
      </div>

      {/* Enhanced Chat Area - Scrollable with proper height calculation */}
      <div 
        className='flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-2 sm:py-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-black/5'
        style={{
          height: 'calc(100vh - 140px)', // Adjust based on header + input heights
          maxHeight: 'calc(100vh - 140px)',
          scrollBehavior: 'smooth'
        }}
      >
        {messages.map((msg, index) => {
          const isMyMessage = isChatbot ? msg.senderId === 'user' : msg.senderId === authUser._id;
          const showAvatar = index === 0 || messages[index - 1]?.senderId !== msg.senderId;
          const avatarSrc = isChatbot
            ? (msg.senderId === 'chatbot' ? selectedUser?.profilePic || assets.avatar_icon : authUser?.profilePic || assets.avatar_icon)
            : (msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon);
          
          return (
            <div 
              key={index} 
              className={`flex items-end gap-2 sm:gap-3 ${isMyMessage ? 'justify-end' : 'justify-start'} group px-1`}
            >
              {/* Avatar for received messages */}
              {!isMyMessage && (
                <div className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                  {showAvatar && (
                    <img 
                      src={avatarSrc}
                      className='w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-600 object-cover' 
                      alt=""
                    />
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className={`max-w-[75%] sm:max-w-[70%] md:max-w-[60%] ${isMyMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                {msg.image ? (
                  <div className={`relative group/image ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}>
                    <img 
                      src={msg.image} 
                      alt='' 
                      className='max-w-[200px] sm:max-w-[280px] w-full h-auto rounded-2xl shadow-xl border border-white/10 hover:scale-105 transition-transform duration-200 cursor-pointer' 
                    />
                    <div className='absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1'>
                      <span className='text-xs text-white'>{formatMessageTime(msg.createdAt)}</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`relative px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl word-wrap break-words ${
                      isMyMessage 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md' 
                        : 'bg-white/10 text-white border border-white/20 rounded-bl-md'
                    }`}
                  >
                    <p className='text-sm leading-relaxed break-words hyphens-auto' style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {msg.text}
                    </p>
                    <div 
                      className={`text-xs mt-1 ${
                        isMyMessage ? 'text-purple-100' : 'text-gray-300'
                      } opacity-70`}
                    >
                      {formatMessageTime(msg.createdAt)}
                    </div>
                    
                    {/* Message tail */}
                    <div 
                      className={`absolute bottom-0 w-2 h-2 sm:w-3 sm:h-3 transform rotate-45 ${
                        isMyMessage 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 -right-1' 
                          : 'bg-white/10 border-r border-b border-white/20 -left-1'
                      }`}
                    ></div>
                  </div>
                )}
              </div>

              {/* Avatar for sent messages */}
              {isMyMessage && (
                <div className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                  {showAvatar && (
                    <img 
                      src={avatarSrc}
                      className='w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-purple-400 object-cover' 
                      alt=""
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {isTyping && (
          <div className='flex items-end gap-2 sm:gap-3 px-1'>
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon}
              className='w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-600 object-cover flex-shrink-0' 
              alt=""
            />
            <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rounded-bl-md px-3 py-2 sm:px-4 sm:py-3'>
              <div className='flex space-x-1'>
                <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce'></div>
                <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={scrollEnd} className='h-1'></div>
      </div>

      {/* Enhanced Input Area - Fixed at bottom */}
      <div className='flex-shrink-0 p-3 sm:p-4 bg-black/20 backdrop-blur-xl border-t border-white/10'>
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 sm:gap-3'>
          <div className='flex-1 relative min-w-0'>
            <div className='flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-2 focus-within:border-purple-400 focus-within:bg-white/15 transition-all duration-200'>
              <input
                onChange={(e) => setInput(e.target.value)}
                type='text'
                placeholder='Type your message...'
                className='flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-sm py-1 min-w-0'
                value={input}
                onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
              />
              
              <div className='flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0'>
                <input 
                  onChange={HandleSendImage} 
                  type='file' 
                  id="image" 
                  accept='image/png,image/jpeg' 
                  hidden 
                />
                <label htmlFor='image' className='cursor-pointer p-1 hover:bg-white/10 rounded-full transition-all duration-200'>
                  <img src={assets.gallery_icon} alt='' className='w-4 h-4 sm:w-5 sm:h-5 opacity-70 hover:opacity-100' />
                </label>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-2.5 sm:p-3 rounded-full transition-all duration-200 shadow-lg flex-shrink-0 ${
              input.trim() 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 active:scale-95' 
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            <img src={assets.send_button} alt='' className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className='h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 hidden md:flex'>
      <div className='text-center space-y-3 sm:space-y-4 max-w-md mx-auto'>
        <div className='relative'>
          <img src="logo1.png" className='w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300' alt="Logo" />
          <div className='absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse'></div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-xl sm:text-2xl font-bold text-white tracking-wide'>Welcome to Chat</h2>
          <p className='text-gray-300 text-base sm:text-lg'>Select a conversation to start messaging</p>
          <p className='text-gray-400 text-sm'>Chat anytime, anywhere with style</p>
        </div>
      </div>
      
      <div className='flex space-x-2'>
        <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce'></div>
        <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
        <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default ChatContainer;