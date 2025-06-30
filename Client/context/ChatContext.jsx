import { createContext, useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";
import React from "react";
import { getGeminiResponse } from '../src/lib/geminiApi';


export const ChatContext = createContext();


export const ChatProvider = ({children}) =>{
    const[messages , setMessages] = useState([]);
    const[users , setUsers] = useState([]);
    const[selectedUser , setSelectedUser] = useState(null);
    const[unseenMessage , setUnseenMessage] = useState({});

    const{socket , axios} = useContext(AuthContext);

    //sidebar

    const getUsers = useCallback(async()=>{
        try{
            const {data} = await axios.get("api/message/users");
            if(data.success){
                setUsers(data.users);
                setUnseenMessage(data.unseenMessage);

            }

        }catch(error){
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || error.message)

        }
    }, [axios])

    //get msg

    const getMessages = async(userId)=>{
        if(userId === 'chatbot') {
            setMessages([]);
            return;
        }
        try{
            const {data} = await axios.get(`api/message/${userId}`);
            setMessages(data.messages);
        }catch(error){
            toast.error(error.message)
        }
    }

    //send msg

    const sendChatbotMessage = async (messageData) => {
        // Add user message
        const userMsg = {
            senderId: 'user',
            text: messageData.text,
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        // Get bot response
        const botText = await getGeminiResponse(messageData.text);
        const botMsg = {
            senderId: 'chatbot',
            text: botText,
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMsg]);
    };

    const sendMessage = async(messageData)=>{
        if(selectedUser?._id === 'chatbot') {
            await sendChatbotMessage(messageData);
            return;
        }
        try{
            const {data} = await axios.post(`/api/message/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages , data.newMessage])

            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message)
        }

    }

    //subscribe to selected user

    const subscribeToMessages = useCallback(() =>{
        if(!socket) return;

        socket.on("newMessage" , (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>[...prevMessages , newMessage])
                axios.put(`/api/message/mark/${newMessage._id}`);

            }else{
                setUnseenMessage((prevUnseenMessages)=>({
                    ...prevUnseenMessages , [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? 
                    prevUnseenMessages[newMessage.senderId] * 1 : 1
                }))
            }
        })
    }, [socket, selectedUser, axios])

    //unsubscribe msgs

    const unsubscribeFromMessages = useCallback(() =>{
        if(socket) socket.off("newMessage");
    }, [socket])

    useEffect(()=>{
        subscribeToMessages();
        return()=>unsubscribeFromMessages();
    } , [subscribeToMessages, unsubscribeFromMessages])

    const value = {
        messages , users , selectedUser ,
        getUsers , getMessages, setMessages , sendMessage,
        setSelectedUser , unseenMessage , setUnseenMessage

    }
    return <ChatContext.Provider value={value}>
{children}
    </ChatContext.Provider>
}