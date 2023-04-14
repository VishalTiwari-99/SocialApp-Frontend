import React, { useContext, useEffect, useState, useRef } from 'react';
import "./messenger.css";
import Topbar from '../../Components/topbar/Topbar';
import Conversation from '../../Components/conversations/Conversation';
import Message from '../../Components/message/Message';
import ChatOnline from '../../Components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const {user} = useContext(AuthContext);
  const scrollRef = useRef();
  const URL = process.env.REACT_APP_SERVER_URL;

  const handleMssgSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member!==user._id);
    //SOCKET
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    await axios.post(URL+"/messages", message, {
      headers:{
        'Content-Type': 'application/json',
      }
    }).then((res)=>{
      setMessages([...messages, res.data]);
      setNewMessage("");
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    socket.current = io("ws://localhost:8700");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev)=>[...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(()=>{
    socket.current.emit("addUser", user._id);
    socket.current.on(("getUsers"), users=>{
      setOnlineUsers(
        user.followings.filter((f)=>users.some((u)=>u.userId===f))
      );
    });
  }, [user]);


  useEffect(()=>{
    const getConversation = async () => {
      axios.get(URL+"/conversations/"+user._id, {
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        setConversations(response.data);
      }).catch((err) => {
        console.log(err);
      })
    };
    getConversation();
  }, [user, URL]);

  useEffect(()=>{
    const getMessages = async () => {
      await axios.get(URL+"/messages/"+currentChat?._id, {
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res)=>{
        setMessages(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    getMessages();
  }, [currentChat, URL]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView();
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder='Search for Friends' className="chatMenuInput" />
              {conversations.map( c => (
                <div onClick={()=>setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user}/>
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {
                currentChat ? 
                    (<><div className="chatBoxTop">
                      {
                        messages.map(mssg => (
                          <div ref={scrollRef}>
                            <Message message={mssg} own={mssg.sender===user._id}/>
                          </div>
                        ))
                      }
                    </div>
                    <div className="chatBoxBottom">
                      <textarea placeholder='write something.....' className='chatMessageInput' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
                      <button className="chatMessageSubmit" onClick={handleMssgSubmit}>Send</button>
                    </div></> )
                :
                  <span className='noConversationText'>Open a conversation to start a chat.</span>
              }
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <div className="chatOnlineText">
                Online Friends
              </div>
              <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
            </div>
          </div>
      </div>
    </>
  )
}

export default Messenger