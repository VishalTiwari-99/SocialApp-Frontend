import axios from 'axios';
import {React, useState, useEffect } from 'react';
import "./chatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const handleClick = async (user) => {
    try{
      const res = await axios.get(`conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getFriends = async () => {
      await axios.get("/users/friends/"+currentId , {
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res)=>{
        setFriends(res.data);
      }).catch((err)=>{
        console.log(err);
      });
    };
    getFriends();
  }, [currentId]);

 

  useEffect(()=>{
    setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);


  return (
    <div className="chatOnline">
      {onlineFriends.map(o=>(
        <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
          <div className="chatOnlineImgContainer">
              <img className='chatOnlineImg' src={o?.profilePicture ? PF+o.profilePicture : PF+"person/noAvatar.jpg"} alt="" />
              <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline